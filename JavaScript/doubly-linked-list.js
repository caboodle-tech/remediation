/**
* JavaScript Doubly Linked List (LL)
*
* @author Christopher Keers <source@Caboodle.tech>
* @param {*} [data] - Element to start the LL with.
* @returns {DoublyLinkedList} Returns itself. JavaScript equivalent of a class.
*/
function DoublyLinkedList( data ){

    /** Declare default list properties. */
    this.head = null;
    this.tail = null;
    this.length = 0;

    /** JavaScript equivalent constructor. */
    if( data ){
        this.head = new DoublyLink( data );
        this.length++;
    }
}

DoublyLinkedList.prototype = {

    /**
    * Add an element to the LL.
    *
    * @alias push
    */
    add: function( data ){
        this.push( data );
    },
    /**
    * Add an element to the LL after an existing element.
    *
    * @param {Object} existing - The existing element in the LL.
    * @param {*} data - The new element to add into the LL.
    * @param {Function} [callback] - A callback function that can handle the comparison of the elements instead.
    * @returns {Boolean} True if the element was inserted false otherwise.
    */
    addAfter: function( existing, data, callback ){
        var current = this.head;
        if( callback ){
            callback = eval( callback ); // Only needed if using the demo sites tests.
            while( current != null ){
                if( callback( existing, current.data ) ){
                    if( current.next == null ){
                        current.next = new DoublyLink( data );
                        this.tail = current.next;
                    } else {
                        current.next = new DoublyLink( data, current.next );
                    }
                    this.length++;
                    return true;
                }
                current = current.next;
            }
        } else {
            while( current != null ){
                if( current.data == existing ){
                    if( current.next == null ){
                        current.next = new DoublyLink( data );
                        this.tail = current.next;
                    } else {
                        current.next = new DoublyLink( data, current.next );
                    }
                    this.length++;
                    return true;
                }
                current = current.next;
            }
        }
        return false;
    },
    /**
    * Add an element to the LL before an existing element.
    *
    * @param {*} existing - The existing element in the LL.
    * @param {*} data - The new element to add into the LL.
    * @param {Function} [callback] - A callback function that can handle the comparison of the elements instead.
    * @returns {Boolean} True if the element was inserted false otherwise.
    */
    addBefore: function( existing, data, callback ){
        var current = this.head;
        if( callback ){
            callback = eval(callback); // Only needed if using the demo sites tests.
            if( callback( existing, this.head.data ) ){
                this.head = new DoublyLink( data, null, current );
                this.head.next.previous = this.head;
                return true;
            }
            while( current != null ){
                if( callback( existing, current.data )  ){
                    current.previous.next = new DoublyLink( data, current.previous, current );
                    current.previous.next.next.previous = current.previous.next;
                    this.length++;
                    return true
                }
                current = current.next;
            }
        } else {
            if( this.head.data == existing ){
                this.head = new DoublyLink( data, null, current );
                this.head.next.previous = this.head;
                return true;
            }
            while( current != null ){
                if( current.data == existing ){
                    current.previous.next = new DoublyLink( data, current.previous, current );
                    current.previous.next.next.previous = current.previous.next;
                    this.length++;
                    return true
                }
                current = current.next;
            }
        }
        return false;
    },
    /**
    * Add an element to the head of the LL.
    *
    * @alias unshift
    */
    addFirst: function( data ){
        this.unshift( data );
    },
    /**
    * Make a clone of the current LL.
    *
    * @returns {DoublyLinkedList} A new Doubly Linked List cloned from this Linked List.
    */
    clone: function(){
        var LL = new DoublyLinkedList();
        var current = this.head;
        while( current != null ){
            LL.push( current.data );
            current = current.next;
        }
        return LL;
    },
    /**
    * Make a copy of this LL.
    *
    * @alias clone
    */
    copy: function(){
        return this.clone();
    },
    /**
    * Return and remove the last node in the LL.
    *
    * @returns {*|Null} The last element in the LL or null if list was empty.
    */
    pop: function(){
        var data = null;
        if( this.tail == null ){
            if( this.head != null ){
                data = this.head.data;
                this.head.purge();
                this.head = null;
                this.length--;
            }
        } else {
            data = this.tail.data;
            this.tail = this.tail.previous;
            this.tail.next.purge();
            this.tail.next = null;
            this.length--;
        }
        return data;
    },
    /** Force garbage collection of LL and nodes. */
    purge: function(){
        var current = this.head;
        var next = this.head.next;
        while( current != null ){
            current.purge();
            current = next;
            if( next.next ){
                next = next.next;
            } else {
                current = null;
            }
        }
        this.head = null;
        this.tail = null;
        this.length = 0;
    },
    /**
    * Add an element to the tail of the LL.
    *
    * @param {*} data - The element to add to the LL.
    */
    push: function( data ){
        if( !this.head ){
            this.head = new DoublyLink( data, null, null );
            this.length++;
        } else if( !this.tail ) {
            this.tail = new DoublyLink( data, this.head, null );
            this.head.next = this.tail;
            this.length++;
        } else {
            this.tail.next = new DoublyLink( data, this.tail, null );
            this.tail = this.tail.next;
            this.length++;
        }
    },
    /**
    * Remove a specific node (link) from the LL.
    *
    * @param {*} existing - The node that you want to remove.
    * @param {Function} [callback] - A callback function that can handle the comparison of the elements instead.
    * @returns {Boolean} True if the node was found and removed otherwise false.
    */
    remove: function( existing, callback ){
        var current = this.head;
        if( callback ){
            callback = eval(callback); // Only needed if using the demo sites tests.
            if( callback( existing, current.data ) ){
                this.head = this.head.next;
                current.purge();
                this.length--;
                return true;
            }
            current = current.next;
            while( current != null ){
                if( callback( existing, current.data ) ){
                    if( current.next == null ) {
                        this.tail = current.previous;
                        this.tail.next = null;
                    } else {
                        current.previous.next = current.next;
                        current.next.previous = current.previous;
                    }
                    this.length--;
                    current.purge();
                    return true;
                }
                current = current.next
            }
        } else {
            if( existing = current.data ){
                this.head = this.head.next;
                current.purge();
                this.length--;
                return true;
            }
            current = current.next;
            while( current != null ){
                if( existing == current.data ){
                    if( current.next == null ) {
                        this.tail = current.previous;
                        this.tail.next = null;
                    } else {
                        current.previous.next = current.next;
                        current.next.previous = current.previous;
                    }
                    this.length--;
                    current.purge();
                    return true;
                }
                current = current.next
            }
        }
        return false;
    },
    /**
    * Return and remove the first node in the LL.
    *
    * @alias shift
    */
    removeFirst: function(){
        this.shift();
    },
    /**
    * Return and remove the last node in the LL.
    *
    * @alias pop
    */
    removeLast: function(){
        this.pop();
    },
    /**
    * Reset this LL.
    *
    * @alias purge
    */
    reset: function(){
        this.purge();
    },
    /**
    * Return and remove the first node in the LL.
    *
    * @returns {Object|Null} The first element in the LL or null if list was empty.
    */
    shift: function(){
        var data = null;
        if( this.head != null ){
            data = this.head.data;
            if( this.head.next != this.tail ){
                this.head = this.head.next;
                this.head.previous.purge();
                this.head.previous = null;
            } else {
                this.head = this.head.next;
                this.head.previous.purge();
                this.head.previous = null;
                this.tail = null;
            }
            this.length--;
        }
        return data;
    },
    /**
    * Convert the LL to an associated array.
    *
    * @returns {Array} The LL as an associated array.
    */
    toArray: function(){
        var ary = new Array( this.length );
        var current = this.head;
        var index = 0;
        while( current != null ){
            ary[index] = current.data;
            index++;
            current = current.next;
        }
        return ary;
    },
    /** Print the structure of this LL. */
    toString: function(){
        return JSON.stringify( this.toArray() );
    },
    /**
    * Add an element to the head of the LL.
    *
    * @param {*} data - The element to add to the LL.
    */
    unshift: function( data ){
        if( !this.head ){
            this.head = new DoublyLink( data );
            this.length++;
        } else {
            this.head = new DoublyLink( data, null, this.head );
            this.head.next.previous = this.head;
            this.length++;
        }
    }
};

/**
* JavaScript Doubly LL node (Link)
*
* @author Christopher Keers <source@Caboodle.tech>
*/
function DoublyLink( data, parent, child ){

    /** Declare default node properties. */
    this.data = data;
    this.previous = parent;
    this.next = child;
}

DoublyLink.prototype = {

    /** Force garbage collection of the node. */
    purge: function(){
        this.data = null;
        this.previous = null;
        this.next = null;
    }
}

/**
* TESTS
*
* If you are running the demo site of all Caboodle Tech Inc's remediation
* code examples the code below will run and display the tests of this code.
*/
function runTests(){

    var output = document.getElementById( 'output' );

    /** Only run test if the output DIV was found. */
    if( output ){

        /** Wipe any content already in the outout area. */
        output.innerHTML = '';

        /**
        * Test to run stored in arrays.
        * 0 = method to call : data to add : extra parameters
        * 1 = array of expected results
        */
        var tests = [
            [
                ['push:A', 'push:B', 'push:C', 'push:D', 'push:E'],
                ['A', 'B', 'C', 'D', 'E']
            ],
            [
                ['unshift:A', 'unshift:B', 'unshift:C', 'unshift:D', 'unshift:E'],
                ['E', 'D', 'C', 'B', 'A']
            ],
            [
                ['add:A', 'add:C', 'add:E', 'addAfter:A:B:compare', 'addAfter:C:D'],
                ['A', 'B', 'C', 'D', 'E']
            ],
            [
                ['add:B', 'add:D', 'add:E', 'addBefore:B:A:compare', 'addBefore:D:C'],
                ['A', 'B', 'C', 'D', 'E']
            ],
            [
                ['push:A', 'push:B', 'push:C', 'push:D', 'push:E', 'pop', 'pop'],
                ['A', 'B', 'C']
            ],
            [
                ['push:A', 'push:B', 'push:C', 'push:D', 'push:E', 'shift', 'shift'],
                ['C', 'D', 'E']
            ],
            [
                ['push:A', 'push:B', 'push:C', 'push:D', 'push:E', 'remove:C', 'remove:D'],
                ['A', 'B', 'E']
            ],
            [
                ['push:A', 'push:B', 'push:C', 'push:D', 'push:E', 'remove:A', 'remove:E'],
                ['B', 'C', 'D']
            ],
            [
                ['push:A', 'push:B', 'push:C', 'push:D', 'push:E', 'remove:A:compare', 'remove:E:compare'],
                ['B', 'C', 'D']
            ]
        ];

        /** Note that the test is starting. */
        var node = document.createElement( 'DIV' );
        node.innerHTML = 'Testing Doubly Linked Lists.<br>============================<br><br>';
        output.appendChild( node );

        /** Create a new Doubly List. */
        var LinkedList = new DoublyLinkedList();

        /** Loop through each test. */
        var testCount = tests.length;
        for( var x = 0; x < testCount; x++ ){

            /** Note that a new test is running. */
            node = document.createElement( 'DIV' );
            node.innerHTML = 'Test => ';
            output.appendChild( node );

            /** Run each step of the current test. */
            var sampleCount = tests[x][0].length;
            for( var y = 0; y < sampleCount; y++ ){

                /** Split the method and the data and run the result. */
                var parts = tests[x][0][y].split( ':' );

                /** Handle multiple parameters and log our actions. */
                switch( parts.length ){
                    case 4:
                        LinkedList[ parts[0] ]( parts[1], parts[2], (parts[3]) );
                        node.innerHTML =  node.innerHTML + parts[0] + '(' + parts[1] + ',' + parts[2] + ',' + parts[3] + ') ';
                        break;
                    case 3:
                        LinkedList[ parts[0] ]( parts[1], parts[2] );
                        node.innerHTML =  node.innerHTML + parts[0] + '(' + parts[1] + ',' + parts[2] + ') ';
                        break;
                    case 2:
                        LinkedList[ parts[0] ]( parts[1] );
                        node.innerHTML =  node.innerHTML + parts[0] + '(' + parts[1] + ') ';
                        break;
                    case 1:
                    default:
                        LinkedList[ parts[0] ]();
                        node.innerHTML =  node.innerHTML + parts[0] + '() ';
                }

            }

            /** Close the currently running test input. */
            node.innerHTML =  node.innerHTML.substring( 0, node.innerHTML.length - 1 ) + '<br><br>';
            output.appendChild( node );

            /** Did this test pass? */
            var result = LinkedList.toString().replace( /"/g, '' ).replace( /,/g, ', ' );
            var expected = JSON.stringify( tests[x][1] ).replace( /"/g, '' ).replace( /,/g, ', ' );
            var grade = ' (Fail)';
            if( result == expected ){ grade = ' (Pass)'; }

            /** Print the current state. */
            node = document.createElement( 'DIV' );
            node.innerHTML = '&nbsp;Current State: ' + result + grade;
            output.appendChild( node );

            /** Print the expected state. */
            node = document.createElement( 'DIV' );
            node.innerHTML = 'Expected State: ' + expected + '<br><br>';
            output.appendChild( node );

            /** Reset the List for the next test. */
            LinkedList.reset();
            node = document.createElement( 'DIV' );
            node.innerHTML = 'Test Done. Reset.<br>=================<br><br>';
            output.appendChild( node );

        }
        // End main test for loop.
    }
    // End check for output DIV.
}
runTests();

/**
* Compare if two values are the same. This is an oversimplified function
* needed only to test the callback functionality of several methods.
*
* @param {String} existing - The existing value to check.
* @param {String} value - The value to check against.
* @returns {Boolean} True if the values matched false otherwise.
*/
function compare( existing, value ){
    if( existing == value ){
        return true;
    }
    return false;
}
