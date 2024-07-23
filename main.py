import argparse
import uuid
import os
import json
from node import Node
from buchheim import buchheim, assign_y_values


class Tree:
    def __init__(self,file_path, canvas_path,user_set_level=5,render_linked_pages=False):

        self.file_path = file_path
        self.notes_dir = os.path.dirname(file_path)
        self.canvas_path = canvas_path
        self.render_linked_pages = render_linked_pages
        self.canvas_json = {"nodes": [],	"edges": []}
        self.user_set_level = user_set_level
        self.child_page_level = 69
        self.max_depth_level = 0
        self.root_node = self.construct_tree()

    def get_file(self):
        
        with open(self.file_path) as md_file:
            all_lines = md_file.readlines()
        return all_lines

    def construct_tree(self,debug=False):

        all_lines = self.get_file()

        all_nodes = self.create_nodes_list(all_lines, self.file_path)
        tree_node = self._construct_tree(all_nodes)
        
        if debug:
            print("all lines")
            print(all_lines)
            print("all nodes")
            print(all_nodes)
            print("tree",tree_node)

        return tree_node

    def create_nodes_list(self, all_lines, file_path):

        root_node_content = os.path.basename(file_path)[:-3]
        root_node = Node(root_node_content, 0)
        nodes = [root_node]

        current_node = None
        for line in all_lines:
            
            level = self.classify_header(line)

            if 0 < level and level != self.child_page_level:
                node = Node(line, level, file_path)

                nodes.append(node)
                current_node = node
                
            
            elif self.render_linked_pages and (level == self.child_page_level):
                    print("here",self.render_linked_pages and (level == self.child_page_level))
                    file_name = self.extract_single_bracket_content(line) + ".md"
                    canvas_name = self.extract_single_bracket_content(line) + ".canvas"
                    

                    file_path = f"{self.notes_dir}/{file_name}"
                    canvas_path = f"{self.notes_dir}/{canvas_name}"

                    print("\nRecursing")
                    print(f'File Name: {file_path}')
                    
                    rec_tree = Tree(file_path,canvas_path,self.user_set_level)
                    tmp_node = rec_tree.construct_tree()
                    tmp_node.level = self.user_set_level
                    nodes.append(tmp_node)            
            
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
                
                elif candidate_node.level == 69:

                    print("Reached Recursed Node")
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

    
    def classify_header(self,line: str) -> int:
        """Classify the level of the markdown header

        Args:
            line (str): The line to be parsed

        Returns:
            int: integer describing the heading level 
        """

        h_ids = ['#'*i + ' ' for i in range(1, self.user_set_level+1)]

        if line.startswith('#render-tag'):
            return self.child_page_level

        for i, e in enumerate(h_ids):

            if line[:len(e)] == e:
                return i + 1

        else:
            return -1  # using 0 as file node level.

    def complete_process(self):

        print('\n\n----------------------\nFull Process')
        print(self.root_node)
        print(self.root_node.children)
        assign_y_values(self.root_node)
        self.root_node = buchheim(self.root_node)
        self.assign_sizes(self.root_node)
        self.obsidian_construct_cards(self.root_node)
        self._obsidian_connect_edges(self.root_node)

        with open(self.canvas_path, 'w') as json_file:
            json.dump(self.canvas_json, json_file)

    @staticmethod
    def extract_single_bracket_content(text):
        # Split the text by '[[' and take the last part
        parts = text.split('[[')
        return parts[-1][:-3]

    




if __name__ == "__main__":

    parser = argparse.ArgumentParser(prog='Python Tree Drawing Module',description='Draws tree, and places it into the required json')
    parser.add_argument('--src', '-s')
    parser.add_argument('--dest', '-d')
    parser.add_argument('--max-header','-m',type=int)
    parser.add_argument('--render-links','-r',type=bool)



    args = parser.parse_args()

    print('args',args)

    file_path = args.src
    canvas_path = args.dest
    max_header = args.max_header
    render_links = args.render_links

    print(file_path,canvas_path,max_header)

    tree = Tree(file_path, canvas_path,user_set_level=max_header,render_linked_pages=render_links)
    tree.complete_process()

