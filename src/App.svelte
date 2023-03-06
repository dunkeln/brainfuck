<script lang="ts">
import { newMemory, compile, isValid, lexer } from './utils/brainfuck';
import Editor from './lib/Editor.svelte';
import MemDump from './lib/MemDump.svelte';

let x = '';
$: out = compile(newMemory())(lexer(x));
console.info(out);
</script>

<header>
 the online brainfuck compiler
</header>

<main>
    <textarea bind:value={x} placeholder="put content"/>
    <br/>
    <div>
        { out }
    </div>

    <Editor/>
    <MemDump/>
</main>

<style>
    div {
            display: block;
            background-color: #8DB38B;
            color: white;
        }
</style>
