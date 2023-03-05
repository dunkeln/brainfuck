<script lang="ts">
import _ from 'lodash';
import { lexer, compile} from './utils/brainfuck';


console.info(lexer('>+++---, i am batman'));

// let x = `>++++++++[<+++++++++>-]<.>++++[<+++++++>-]
// <+.+++++++..+++.>>++++++[<+++++++>-]<++.------------.
// >++++++[<+++++++++>-]<+.<.+++.------.--------.>>>
// ++++[<++++++++>-]<+.`;
let x = 'content here';
// let x = '++++++[>+++++++++++<-]>-.'
$: tokens = lexer(x);
let memory = {
        pos: 0,
        stack: new Uint8Array(30, () => 0)
    };

$: out = compile(memory)(tokens);
console.info(out);

</script>

building the brainfuck compiler


<input type="text" bind:value={x}/>

<br/>
received {x}
<br/>
resolved { out }
