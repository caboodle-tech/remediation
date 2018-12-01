function SinglyLinkedList(){

    this.head = null;
    this.tail = null;
    this.length = 0;
}

SinglyLinkedList.prototype = {

    add: function( elem ){
        this.push( elem );
    },
    addAfter: function( existing, elem, callback ){
        var current = this.head;
        if( callback ){
            callback = eval(callback); // Only needed if using the demo sites tests.
            while( current != null ){
                if( callback( existing, current.value ) ){
                    if( current.next == null ){
                        current.next = new SinglyLink( elem );
                        this.tail = current.next;
                    } else {
                        current.next = new SinglyLink( elem, current.next );
                    }
                    this.length++;
                    return true;
                }
                current = current.next;
            }
        } else {
            while( current != null ){
                if( current.value == existing ){
                    if( current.next == null ){
                        current.next = new SinglyLink( elem );
                        this.tail = current.next;
                    } else {
                        current.next = new SinglyLink( elem, current.next );
                    }
                    this.length++;
                    return true;
                }
                current = current.next;
            }
        }
        return false;
    },
    addBefore: function( existing, elem, callback ){
        var current = this.head;
        var previous = current;
        if( callback ){
            callback = eval(callback); // Only needed if using the demo sites tests.
            if( callback( existing, this.head.value ) ){
                this.head = new SinglyLink( elem, current );
                return true;
            }
            while( current != null ){
                if( callback( existing, current.value )  ){
                    previous.next = new SinglyLink( elem, current );
                    this.length++;
                    return true
                }
                previous = current;
                current = current.next;
            }
        } else {
            if( this.head.value == existing ){
                this.head = new SinglyLink( elem, current );
                return true;
            }
            while( current != null ){
                if( current.value == existing ){
                    previous.next = new SinglyLink( elem, current );
                    this.length++;
                    return true
                }
                previous = current;
                current = current.next;
            }
        }
        return false;
    },
    addFirst: function( elem ){
        this.unshift( elem );
    },
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
    push: function( elem ){

        if( !this.head ){
            this.head = new SinglyLink( elem );
            this.length++;
        } else if( !this.tail ) {
            this.tail = new SinglyLink( elem );
            this.head.next = this.tail;
            this.length++;
        } else {
            this.tail.next = new SinglyLink( elem );
            this.tail = this.tail.next;
            this.length++;
        }
    },
    reset: function(){
        this.purge();
    },
    toArray: function(){
        var ary = new Array( this.length );
        var current = this.head;
        var index = 0;
        while( current != null ){
            ary[index] = current.value;
            index++;
            current = current.next;
        }
        return ary;
    },
    toString: function(){
        return JSON.stringify( this.toArray() );
    },
    unshift: function( elem ){

        if( !this.head ){
            this.head = new SinglyLink( elem );
            this.length++;
        } else {
            this.head = new SinglyLink( elem, this.head );
            this.length++;
        }
    }
};

function SinglyLink( elem, child ){
    this.value = elem;
    this.next = child;
}

SinglyLink.prototype = {
    purge: function(){
        this.value = null;
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

    var output = document.getElementById('output');

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
            ]
        ];

        /** Note that the test is starting. */
        var node = document.createElement('DIV');
        node.innerHTML = 'Testing Singly Linked Lists.<br>============================<br><br>';
        output.appendChild( node );

        /** Create a new Singly List. */
        var LinkedList = new SinglyLinkedList();

        /** Loop through each test. */
        var testCount = tests.length;
        for( var x = 0; x < testCount; x++ ){

            /** Note that a new test is running. */
            node = document.createElement('DIV');
            node.innerHTML = 'Test => ';
            output.appendChild( node );

            /** Run each step of the current test. */
            var sampleCount = tests[x][0].length;
            for( var y = 0; y < sampleCount; y++ ){

                /** Split the method and the data and run the result. */
                var parts = tests[x][0][y].split(':');

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
                    default:
                        LinkedList[ parts[0] ]( parts[1] );
                        node.innerHTML =  node.innerHTML + parts[0] + '(' + parts[1] + ') ';
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
            node = document.createElement('DIV');
            node.innerHTML = '&nbsp;Current State: ' + result + grade;
            output.appendChild( node );

            /** Print the expected state. */
            node = document.createElement('DIV');
            node.innerHTML = 'Expected State: ' + expected + '<br><br>';
            output.appendChild( node );

            /** Reset the List for the next test. */
            LinkedList.reset();
            node = document.createElement('DIV');
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
* needed only to test the callback functionality several methods.
*
* @param {string} existing The existing value to check.
* @param {string} value The value to check against.
* @returns {bool} True if the values matched false otherwise.
*/
function compare( existing, value ){
    if( existing == value ){
        return true;
    }
    return false;
}
