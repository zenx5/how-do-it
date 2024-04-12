const React = require("react");
const { useEffect, useState, useRef } = React
const HowDoitContext = require("./Context");

function HowDoitProvider({content, children }) {
    const [current, setCurrent] = useState(null)
    const [show, setShow] = useState(false)
    const ref = useRef()

    useEffect(()=>{
        function clickIt(event) {
            const howdoit = event.target.dataset.howdoit
            if( howdoit ) {
                setCurrent(howdoit)
                ref.current.style.display = 'block'
                setTimeout(()=>setShow( () =>  true),100)
            }
        }
        document.addEventListener('click', clickIt)

        return ()=>document.removeEventListener('click', clickIt)
    },[show])

    useEffect(()=>{
        if( !show ) {
            setCurrent(null)
            setTimeout(()=>ref.current.style.display = 'none', 1100)
        }
    },[show])

    const values = {}

    const handlerClose = () => setShow(false)

    const styleContent = `
        *[data-howdoit] {
            position: relative;
            border: 4px solid rgb(241 245 249);

            &:hover{
                border: 4px solid #DBEAFE;
                &:before {
                    background-color: rgb(219 234 254);
                    content: '?';
                    color: rgb(59 130 246);
                }
            }

            &:before{
                position: absolute;
                right: -1rem;
                height: 1.25rem;
                width: 1.25rem;
                cursor: pointer;
                border-radius: 9999px;
                background-color: rgb(241 245 249);
                padding: 0px;
                text-align: center;
                font-size: 0.875rem;
                line-height: 1.25rem;
                color: rgb(148 163 184);
                content: '?';
            }
        }`

    if( !document.querySelector('#how-do-it-style') ){
        const style = document.createElement('style')
        style.id = 'how-do-it-style'
        style.innerHTML = styleContent
        document.head.appendChild(style)
    }

    const span = React.createElement('span', {
        ref: ref,
        style: {
            opacity: show ? 1 : 0,
            position: "fixed",
            bottom: "1.25rem",
            left: "25%",
            borderRadius: "0.75rem",
            width: "50%",
            height: "15rem",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "rgb(100 116 139)",
            transitionProperty: "all",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "1000ms",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        }
        },
        current && content[current],React.createElement('button', {
            onClick: handlerClose,
            style: {
                display: "flex",
                position: "absolute",
                top: "-0.25rem",
                right: "-0.25rem",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "9999px",
                border: "1px solid rgb(100 116 139)",
                width: "1.25rem",
                height: "1.25rem",
                backgroundColor: "#ffffff",
                cursor: "pointer",
                padding: "12px",
            }
        }, 'x'))

    return React.createElement(HowDoitContext.Provider, {value:values, className:'how-do-it-provider'}, children, span)
}

module.exports = HowDoitProvider