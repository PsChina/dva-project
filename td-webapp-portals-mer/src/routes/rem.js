export default (value)=>{
    document.documentElement.style.fontSize = `${document.body.clientWidth/value}px`; // 768px
    window.onresize = ()=>{
        console.log(`reset fontsize${document.body.clientWidth /value}`)
        document.documentElement.style.fontSize = `${document.body.clientWidth/value}px`; // 768px
    }
}