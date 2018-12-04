<?php
/** Only display critical error messages. */
error_reporting( E_ERROR  | E_WARNING );

/** Check which example to load if any. */
$example = $_GET['example'];
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>JavaScript</title>
    <meta name="description" content="JavaScript remediation examples.">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="../prism.css">
    <script src="../prism.js" type="text/javascript"></script>
    <script type="text/javascript">
        /** Handle when the user toggles page views. */
        function toggleView( view ){
            /** This demo by its nature is ever changing make sure things are not missing. */
            var source = document.getElementById('source');
            var sourceBtn = document.getElementById('source-btn');
            var output = document.getElementById('output');
            var outputBtn = document.getElementById('output-btn');
            if( source && sourceBtn && output && outputBtn ){
                if( view == 'output' ){
                    source.style.display = 'none';
                    sourceBtn.classList.remove( 'selected' );
                    output.style.display = 'block';
                    outputBtn.classList.add( 'selected' );
                } else {
                    source.style.display = 'block';
                    sourceBtn.classList.add( 'selected' );
                    output.style.display = 'none';
                    outputBtn.classList.remove( 'selected' );
                }
            }

        }

        /** When an example is choosen from the list display it. */
        function loadExample(){

            var example = document.getElementById('select-example');
            if( example ){

                /** Which example was choosen? */
                example = example.value;

                /** Build the URL and reload the page. */
                var url = [location.protocol, '//', location.host, location.pathname].join('');
                if( example ){
                    window.location.href = url + '?example=' + example;
                } else {
                    window.location.href = url;
                }
            }
        }
    </script>
</head>
<body>
    <div id="header">
        <a href='../' class="link">&#8630; Parent Directory.</a> You are viewing the JavaScript remediation examples. Load example: <select name="select-example" id="select-example" onchange="loadExample();"><option value=""></option>
<?php
    /** Loop through the JavaScript directory and add all examples to this list. */
    $files = scandir( './' );
    $avoid = array( '.', '..', 'style.css', 'index.php', 'index.html' );
    foreach( $files as $file ){

        /** Make sure to only add example files to the list. */
        if( !in_array( $file, $avoid ) ){

            /** Is this example the currently selected one? */
            if( $file == $example ){
                /** Yes. Mark it as selected in the list. */
                echo '<option value="' . $file . '" selected>' . display_name( $file ) . '</option>';
            } else {
                /** No. Just add it to the list. */
                echo '<option value="' . $file . '">' . display_name( $file ) . '</option>';
            }
        }
    }
?>
        </select>
    </div>
    <div id="console">
        <div id="controls">
            <div id="source-btn" class="button selected" onclick="toggleView('source');">
                View Source Code
            </div>
            <div id="output-btn" class="button" onclick="toggleView('output');">
                View Test Output
            </div>
        </div>
        <div id="source">
<pre><code class="line-numbers language-javascript"><?php
    /** If an example has been choosen display it's source code. */
    if( $example ){
        if( file_exists( $example ) ){
            /** Get the code, rmeove any BR tags, and replace tabs with non-breaking spaces. */
            $file = file_get_contents( $example );
            $file = str_replace( '<br>', '', $file );
            $file = str_replace( '    ', '&nbsp;&nbsp;&nbsp;&nbsp;', $file );
            $file = str_replace( '     ', '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', $file );

            /** Remove the test code. */
            $file = substr( $file, 0, strpos( $file, '* TESTS' ) - 5 );

            /** Repace newline cariage returns with BR tags. */
            echo nl2br( $file );
        }
    } else {
        /** No file was choosen. */
        echo '/** Please choose an example from the drop down menu. */';
    }
?>
</code></pre>
        </div>
        <div id="output">
            There is nothing to show. Please choose an example from the drop down menu.
        </div>
    </div>
<?php
    /** If an example was choosen already make sure to include the code for it. */
    if( $example ){
        echo '<script src="' . $example . '"></script>';
    }
?>
</body>
</html>

<?php
/**
* Transform a filename into a sentence appropriate version.
*
* @param string $string The filename to convert for use in a sentence.
* @return string The converted sentence.
*/
function display_name( $string ){
    $string = str_replace( '-', ' ', $string );
    $string = str_replace( '.js', '', $string );
    return ucwords( $string );
}
?>
