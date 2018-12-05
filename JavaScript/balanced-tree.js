/**
* JavaScript Balanced Tree
*
* NOTE: This is not a plain tree, it is a self balancing
* tree that will automatically handle staying balanced.
*
* @author Christopher Keers <source@Caboodle.tech>
* @param {*} [data] - Element to start the tree with.
* @returns {BalancedTree} Returns itself. JavaScript equivalent of a class.
*/
function BalancedTree( data ){

    /** Declare default list properties. */
    this.root = null;
    this.size = 0;

    /** JavaScript equivalent constructor. */
    if( data ){
        this.root = new Node( data );
        this.size++;
    }
}

BalancedTree.prototype = {
    add: function( data ){

        if( this.root == null ){
            this.root = new Node( data );
        } else {
            var current = this.root;
            while( current != null ){
                if( data < current.data ){
                    // Left
                    if( current.left == null ){
                        // Insert here
                        current.left = new Node( data );
                        current.left.parent = current;
                        current = current.left;
                        break;
                    } else {
                        current = current.left;
                    }
                } else {
                    // Right
                    if( current.right == null ){
                        // Insert here
                        current.right = new Node( data );
                        current.right.parent = current;
                        current = current.right;
                        break;
                    } else {
                        current = current.right;
                    }
                }
            }
            this._balanceTree( current );
        }
        this.size++;
    },
    _balanceTree: function( currentNode ){
        var parent = currentNode.parent;
        if( parent.left == currentNode ){
            parent.balance--;
        } else {
            parent.balance++;
        }
        switch( parent.balance ){
            case 0:
                /** We're balanced under this node stop trying to balance. */
                break;
            case 2:
                if ( parent.right.balance == -1 ){
                    // Double left rotation
                    this._doubleLeftRotation( parent );
                } else{
                    // Single left rotation
                    this._singleLeftRotation( parent );
                }
                break;
            case -2:
                if ( parent.left.balance == 1 ){
                    // Double right rotation
                    this._doubleRightRotation( parent );
                } else{
                    // Single right rotation
                    this._singleRightRotation( parent );
                }
                break;
            default:
                if( parent != this.root ){
                    this._balanceTree( parent );
                }
                break;
        }
    },
    _deleteTree: function( currentNode ){
        if( currentNode != null ){
            /** Delete the current nodes subtrees first. */
            this._deleteTree( currentNode.left );
            this._deleteTree( currentNode.right );

            /** Delete the current node. */
            currentNode.purge();
        }
        return;
    },
    _doubleLeftRotation: function( currentParent ){
        this._singleRightRotation( currentParent.right );
        // Now its a single left
        this._singleLeftRotation( currentParent );
    },
    _doubleRightRotation: function( currentParent ){
		this._singleLeftRotation( currentParent.left );
		// Now its a single left
		this._singleRightRotation( currentParent );
	},
    _fixGenealogy: function( oldParent, newParent ){
		if ( oldParent == this.root ){
			this.root = newParent;
		} else {
			if( oldParent.parent.right == oldParent ){
				oldParent.parent.right = newParent;
			} else {
				oldParent.parent.left = newParent;
			}
		}
	},
    getHeight: function(){
        if( this.root == null ){
            return -1;
        }
        if( this.root.left == null && this.root.right == null ){
            return 0;
        }
        return ( this._maxDepth( this.root ) - 1 );
    },
    // https://www.geeksforgeeks.org/write-a-c-program-to-find-the-maximum-depth-or-height-of-a-tree/
    _maxDepth: function( currentNode ){
        if( currentNode == null ){
            return 0;
        } else {

            /** Recursively count the levels in the tree. */
            var leftDepth = this._maxDepth( currentNode.left );
            var rightDepth = this._maxDepth( currentNode.right );

            /** Use the largest number. */
            if ( leftDepth > rightDepth ) {
                return ( leftDepth + 1 );
            } else {
                return ( rightDepth + 1 );
            }
        }
    },
    purge: function(){
        this._deleteTree( this.root );
        this.root = null;
        this.size = 0;
    },
    remove: function( data ){
        /** Do we have a tree to check? */
        if( this.root ){
            /** Yes. Check for the data and remove it. */
            return this._removeNode( data, this.root );
        }
        /** No. There isn't a tree to search in. */
        return false;
    },
    _removeNode: function( data, currentNode ){
        // TODO: ADD SELF BALANCING INTO THIS!!!
        /** Is this the node to remove? */
        if( data == currentNode.data){
            // Yes
            if( currentNode.left == null && currentNode.right == null ){
                // Leaf node
                if( currentNode.parent.left == currentNode ){
                    currentNode.parent.left = null;
                } else {
                    currentNode.parent.right = null;
                }
            } else if( currentNode.left != null && currentNode.right == null ){
                if( currentNode.parent.left == currentNode ){
                    currentNode.parent.left = currentNode.left;
                    currentNode.parent.left.parent = currentNode.parent;
                } else {
                    currentNode.parent.right = currentNode.left;
                    currentNode.parent.right.parent = currentNode.parent;
                }
            } else if( currentNode.left == null && currentNode.right != null ){
                if( currentNode.parent.left == currentNode ){
                    currentNode.parent.left = currentNode.right;
                    currentNode.parent.left.parent = currentNode.parent;
                } else {
                    currentNode.parent.right = currentNode.right;
                    currentNode.parent.right.parent = currentNode.parent;
                }
            } else {
                // Has 2 children
            }
            this.size--;
            return true;
        } else {
            // No
            if( data < currentNode.data ){
                // Left
                if( currentNode.left ){
                    return this._removeNode( data, currentNode.left );
                }
            } else {
                // Right
                if( currentNode.right ){
                    return this._removeNode( data, currentNode.right );
                }
            }
        }
        /** The data was never found in this tree. */
        return false;
    },
    /**
    * Reset the tree.
    *
    * @alias purge
    */
    reset: function(){

    },
    _singleLeftRotation: function( oldParent ){
        // Setup call signs for each node involved
		var newParent = oldParent.right;
		var bottomNode = newParent.right;
		// Transfer link from oldParent's parent to its new child, the newParent
		this._fixGenealogy( oldParent, newParent );
		newParent.parent = oldParent.parent;
		oldParent.parent = newParent;
		// Swap children if any
		oldParent.right = newParent.left;
		newParent.left = oldParent;
		// Reset balances
		oldParent.balance = 0;
		newParent.balance = 0;
    },
    _singleRightRotation: function( oldParent ){
		// Setup call signs for each node involved
		var newParent = oldParent.left;
		var bottomNode = newParent.left;
		// Transfer link from oldParent's parent to its new child, the newParent
		this._fixGenealogy( oldParent,newParent );
		newParent.parent = oldParent.parent;
		oldParent.parent = newParent;
		// Swap children if any
		oldParent.left = newParent.right;
		newParent.right = oldParent;
		// Reset balances
		oldParent.balance = 0;
		newParent.balance = 0;
	},
    /**
    * How many nodes are in the Tree.
    *
    * @returns {Integer} The amount of nodes in the current Tree.
    */
    size: function(){
        return this.size();
    },
    /**
    * How many nodes are in the Tree.
    *
    * @alias size
    */
    treeSize: function(){
        return this.size();
    }
};

function Node( data ){
    this.data = data;
    this.balance = 0;
    this.parent = null;
    this.left = null;
    this.right = null;
}

Node.prototype = {

    purge: function(){
        this.data = null;
        this.balance = null;
        this.parent = null;
        this.left = null;
        this.right = null;
    }
};
