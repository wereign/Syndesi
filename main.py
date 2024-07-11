import argparse
import uuid
import os
import json
from node import Node
from buchheim import buchheim


class Tree:
    def __init__(self, file_path, canvas_path):

        self.file_name = os.path.basename(file_path)
        self.file_path = file_path
        self.canvas_path = canvas_path
        self.canvas_json = {"nodes": [],	"edges": []}
        self.max_depth_level = 0
        self.root_node = self.construct_tree()

    def get_file(self):
        file_path = self.file_path
        with open(file_path) as md_file:
            all_lines = md_file.readlines()
        return all_lines

    def construct_tree(self):

        all_lines = self.get_file()
        all_nodes = self.create_nodes_list(all_lines, self.file_name)
        tree_node = self._construct_tree(all_nodes)

        return tree_node

    def create_nodes_list(self, all_lines, file_name):

        root_node_content = file_name[:-2]
        root_node = Node(root_node_content, 0)
        nodes = [root_node]

        current_node = None
        for line in all_lines:

            level = self.classify_header(line)
            if level > 0:
                node = Node(line, level, file_name)

                nodes.append(node)
                current_node = node
            else:
                # the line is not a level changing line, append it to current node if it exists.
                if current_node != None:

                    new_string = current_node.string + line
                    current_node.modify_node_string(new_string)

        return nodes

    def _construct_tree(self, node_list):
        parent_child_counter = {}  # To keep track of the number of children each parent has

        for idx in range(len(node_list) - 1, 0, -1):
            node = node_list[idx]
            self.max_depth_level = max(self.max_depth_level, node.level)

            for candidate_idx in range(idx, -1, -1):
                candidate_node = node_list[candidate_idx]
                if candidate_node.level == node.level - 1:
                    if candidate_node not in parent_child_counter:
                        parent_child_counter[candidate_node] = 0

                    # Assign a unique number to the node
                    node.number = parent_child_counter[candidate_node]
                    node.parent = candidate_node
                    parent_child_counter[candidate_node] += 1

                    candidate_node.add_children(node)
                    break

        return node_list[0]

    def assign_sizes(self, root_node: Node):

        root_node.assign_card_size()

        if len(root_node.children) > 0:
            for child in root_node.children:
                self.assign_sizes(child)
        else:
            pass

    def obsidian_construct_cards(self, node: Node):

        # print("Appending", node.obsidian_json['x'], node.obsidian_json['y'])

        node.modify_x(node.x*500)

        self.canvas_json['nodes'].append(node.obsidian_json)

        children_nodes = node.children

        if len(children_nodes) > 0:
            for child in children_nodes:
                self.obsidian_construct_cards(child)

        return self.canvas_json

    def _obsidian_connect_edges(self, node: Node) -> None:

        for child_node in node.children:
            edge_dict = {"id": str(uuid.uuid4()),
                         "fromNode": node.uuid,
                         "fromSide": "bottom",
                         "toNode": child_node.uuid,
                         "toSide": "top"}
            self.canvas_json['edges'].append(edge_dict)

            if len(child_node.children) > 0:
                self._obsidian_connect_edges(child_node)

    @staticmethod
    def classify_header(line: str) -> int:
        """Classify the level of the markdown header

        Args:
            line (str): The line to be parsed

        Returns:
            int: integer describing the heading level 
        """
        # h1_id = '# '
        # h2_id = '## '
        # h3_id = '### '

        # if line[:len(h1_id)] == h1_id:
        #     return 1

        # elif line[:len(h2_id)] == h2_id:
        #     return 2

        # elif line[:len(h3_id)] == h3_id:
        #     return 3

        # else:
        #     return -1  # using 0 as file node level.

        h_ids = ['#'*i + ' ' for i in range(1, 7)]

        for i, e in enumerate(h_ids):

            if line[:len(e)] == e:
                return i + 1

        else:
            return -1  # using 0 as file node level.

    def complete_process(self):

        self.root_node = buchheim(self.root_node)
        print("Assigning Sizes")
        self.assign_sizes(self.root_node)
        self.obsidian_construct_cards(self.root_node)
        self._obsidian_connect_edges(self.root_node)

        with open(self.canvas_path, 'w') as json_file:
            json.dump(self.canvas_json, json_file)









if __name__ == "__main__":

    parser = argparse.ArgumentParser(prog='Python Tree Drawing Module',description='Draws tree, and places it into the required json')
    parser.add_argument('--src', '-s')
    parser.add_argument('--dest', '-d')


    args = parser.parse_args()

    file_path = args.src
    canvas_path = args.dest

    print(file_path,canvas_path)

    tree = Tree(file_path, canvas_path)
    tree.complete_process()

