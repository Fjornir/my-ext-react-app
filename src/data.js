export default {
    mtype: 'folder',
    expanded: true,
    children: [
        {
            id: 'child',
            mtype: 'file',
            text: "child",
            leaf: true,
            size: '2mb'
        },
        {
            id: 'folder',
            mtype: 'folder',
            text: "folder",
            expanded: true,
            children: [
                {
                    id: 'folder child',
                    text: "folder child",
                    leaf: true,
                    mtype: 'file'
                }, {
                    text: "folder child2",
                    mtype: 'file',
                    leaf: true
                }]
        }, {
            text: "child2",
            mtype: 'file',
            leaf: true
        }]
};