import uuid
import os
import json


class Node:
    def __init__(self, string, level, parent=None, number=1):

        # Node Configuration
        self.level = level
        self.depth = level
        self.children = []
        self.mod = 0
        self.x = 0
        # Automatically determining the position of the card here
        self.y = (self.level * 500) + 400
        # 500 is for the height of the card, and 400 for the distance between the cards

        # Card Contents
        self.string = string
        self.uuid = str(uuid.uuid4())
        # ignoring #, ## etc and the final newline
        self.title_content = self.string[self.level+1:-1]

        # Card Configuration

        self.obsidian_json = {
            "id": self.uuid,
            "x": self.x,
            "y": self.y,
            "width": 400,
            "height": 400,
            "type": 'text',
            "text": self.string
        }

        # rg algo attributes
        self.parent = parent
        self.thread = None
        self.mod = 0
        self.ancestor = self
        self.change = self.shift = 0
        self._lmost_sibling = None
        self.number = number  # the idx of the node among it's siblings
    
    def assign_card_size(self):

        lines = self.string.split('\n')
        n_empty = 0

        for line in lines:

            if len(line) == 0:
                n_empty += 1

        
        if (len(lines) - n_empty) == 1:
            
            print("Title Only",self.string)
            print(n_empty)
            print(len(lines))
            print()
            self.obsidian_json['height'] = 100
        


    # rg algo functions

    def left(self):
        return self.thread or len(self.children) and self.children[0]

    def right(self):
        return self.thread or len(self.children) and self.children[-1]

    def lbrother(self):
        n = None
        if self.parent:
            for node in self.parent.children:
                if node == self:
                    return n
                else:
                    n = node
        return n

    def get_lmost_sibling(self):
        if not self._lmost_sibling and self.parent and self != self.parent.children[0]:
            self._lmost_sibling = self.parent.children[0]
        return self._lmost_sibling

    lmost_sibling = property(get_lmost_sibling)

    def modify_node_string(self, new_string):
        self.string = new_string
        self.obsidian_json['text'] = self.string

    def add_children(self, child_node):

        if child_node.level == self.level + 1:
            x = len(self.children)
            child_node.x = x
            self.children.append(child_node)
        else:
            pass
        


    def __repr__(self, with_content=False):

        string = ''
        indent = "\t"*self.level
        string += f'{indent} Level: {self.level} X:{self.x} Content: {self.title_content} \n'

        if with_content:
            string += '\n'+indent+self.string

        return string

    def __str__(self):

        return self.__repr__()

    def modify_x(self, x):
        """Modifying the x axis value for the card"""
        self.x = x
        self.obsidian_json['x'] = x

    def reflect_x(self):
        self.obsidian_json['x'] = self.x * 500
