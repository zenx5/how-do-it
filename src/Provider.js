const React = require("react");
const { useEffect, useState, useRef } = React
const HowDoitContext = require("./Context");

function HowDoitProvider({content, children }) {
    const [current, setCurrent] = useState(null)
    const [show, setShow] = useState(false)
    const ref = useRef()

    const createDataset = key => {
        return {
            'data-howdoit': key
        }
    }

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

    const values = {
        createDataset
    }

    const handlerClose = () => setShow(false)

    const styleContent = `
    .how-do-it-provider {
        [data-howdoit] {
            position: relative;
            border-width: 4px;

            &:hover{
                border-color: #DBEAFE;
            }

            &::before{
                position: absolute;
                right: 1.25rem;
                padding: 0;
                border-radius: 9999px;
                width: 1.25rem;
                height: 1.25rem;
                font-size: 0.875rem;
                line-height: 1.25rem;
                text-align: center;
                cursor: pointer;
                &:hover {
                    color: #3B82F6;
                    background-color: #DBEAFE;
                }
            }
        }
    }`

    const style = React.createElement('style',{
        rel:'stylesheet',
        type:'text/css'
    }, styleContent)

    const span = React.createElement('span', {
        ref: ref,
        style: {
            opacity: show ? 1 : 0,
            position: "fixed",
            bottom: "1.25rem",
            left: "25%",
            borderRadius: "0.75rem",
            width: "50%",
            transitionProperty: "all",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: ["300ms", "1000ms"],
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
                borderWidth: "1px",
                width: "1.25rem",
                height: "1.25rem",
                backgroundColor: "#ffffff",
                cursor: "pointer"
            }
        }, 'x'))

    return React.createElement(HowDoitContext.Provider, {value:values, className:'how-do-it-provider'}, style, children, span)
}

module.exports = HowDoitProvider