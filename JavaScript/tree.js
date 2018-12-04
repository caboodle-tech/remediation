/**
* JavaScript Tree
*
* NOTE: This is not a plain tree, it is a self balancing
* tree that will automatically handle staying balanced.
*
* @author Christopher Keers <source@Caboodle.tech>
* @param {*} [data] - Element to start the tree with.
* @returns {Tree} Returns itself. JavaScript equivalent of a class.
*/
function Tree( data ){

    /** Declare default list properties. */
    this.root = null;
    this.size = 0;

    /** JavaScript equivalent constructor. */
    if( data ){
        this.root = new Node( data );
        this.size++;
    }
}

Tree.prototype = {
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
    remove: function( data ){

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
