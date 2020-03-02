import React, {Component} from 'react';
import {Button, Container, SegmentedButton, TextField, Toolbar, Tree} from '@sencha/ext-react-modern';
import data from './data';

Ext.require([
    'Ext.data.TreeStore',
    'Ext.grid.plugin.TreeDragDrop',
    'Ext.grid.plugin.Editable',
    'Ext.grid.plugin.CellEditing'
]);

export default class myTreeNode extends Component {

    store = Ext.create('Ext.data.TreeStore', {
        type: 'tree',
        rootVisible: true,
        lazyFill: false,
        sorters: [{
            property: 'text',
            direction: 'ASC'
        }],
        root: data
    });

    state = {
        width: 500,
        height: 500,
        title: 'Tree',
        button1: 'Add Folder'
    };

    addItem = () => {
        let inputField = this.textfield.cmp,
            tree = this.tree.cmp,
            value = inputField.getValue(),
            target = tree.getSelections()[0] || this.store.getRoot(),
            node;

        if (value) {
            node = {
                text: value,
            };

            if (target.data.leaf === true) {
                node.leaf = true;
                node.mtype = "file";
                node = target.parentNode.appendChild(node);
            } else {
                node.leaf = true;
                node.mtype = "file";
                node = target.appendChild(node);
            }

            if (!target.isExpanded()) {
                target.expand(false);
            }

            tree.select(node);
            inputField.reset();
        }
    };

    addFolder = () => {
        let inputField = this.textfield.cmp,
            tree = this.tree.cmp,
            value = inputField.getValue(),
            target = tree.getSelections()[0] || this.store.getRoot(),
            node;

        if (value) {
            node = {
                text: value,
            };

            if (target.data.leaf === true) {
                node.children = [];
                node.mtype = "folder";
                node = target.parentNode.appendChild(node);
            } else {
                node.children = [];
                node.mtype = "folder";
                node = target.appendChild(node);
            }

            if (!target.isExpanded()) {
                target.expand(false);
            }

            tree.select(node);
            inputField.reset();
        }
    };

    deleteItem = () => {
        let tree = this.tree.cmp,
            target = tree.getSelections()[0];
        target.remove();
    };

    onFieldAction = (field, e) => {
        if (e.ENTER === e.getKey()) {
            this.addItem();
        }
    };

    render() {
        const {title, width, height} = this.state;
        return (
            <Container padding="10" layout="center" flex="1" height="100%">
                <Tree selectionModel="value" width={width} height={height} title={title}
                      ref={tree => (this.tree = tree)}
                      store={this.store} shadow flex={1} itemId="navTree"
                      platformConfig={{
                          title: "Editable Tree",
                          desktop: {
                              plugins: {
                                  gridcellediting: true,
                                  treedragdrop: true
                              }
                          }
                      }}
                      {...columnProps}
                >
                    <Toolbar  docked="bottom">
                        <TextField
                            label="Enter file/folder name"
                            ref={textfield => (this.textfield = textfield)}
                            listeners={{
                                action: this.onFieldAction
                            }}
                        />
                        <Container left="290px" layout="vbox">
                            <Container flex={1} layout="hbox">
                            <div style={{margin: '10px'}}>Add:</div>
                            <SegmentedButton
                                onChange={(button, value) => {
                                    this.setState({button: value})
                                }}
                                onReady={({cmp, cmpObj}) => {
                                    cmp.setValue(this.state.button)
                                }}
                            >
                                <Button
                                    ref={button => (this.buttonFolder = button)}
                                    text="Folder"
                                    handler={this.addFolder}
                                />
                                <Button
                                    ref={button => (this.buttonItem = button)}
                                    text="File"
                                    handler={this.addItem}
                                />
                            </SegmentedButton>
                            </Container>
                            <Button
                                text="Delete node"
                                handler={this.deleteItem}
                            />
                        </Container>
                    </Toolbar>
                </Tree>
            </Container>
        )
    }
}

const columnProps = {
    columns: [{
        xtype: 'treecolumn',
        text: "Name",
        dataIndex: "text",
        flex: 1,
        editable: true
    }, {
        xtype: 'textcolumn',
        text: "Size",
        dataIndex: "size",
        flex: 1,
        editable: true
    }]
};