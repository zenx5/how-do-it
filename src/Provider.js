import  React, { useEffect, useState, useRef } from "react"
import { HowDoitContext } from "./Context"
import { elementStyleTemplate } from "./constants"

export function HowDoitProvider({
    content,
    elementStyle,
    children
}) {
    const [current, setCurrent] = useState(null)
    const [show, setShow] = useState(false)
    const ref = useRef()

    useEffect(()=>{
        if( !show ) {
            setCurrent(null)
            setTimeout(()=>ref.current.style.display = 'none', 1100)
        }
    },[show])

    useEffect(()=>{
        const {
            borderColor = "rgb(148 163 184)",
            colorMarker = "rgb(148 163 184)",
            backgroundColor = "rgb(241 245 249)",
            borderColorHover = "#DBEAFE",
            colorMarkerHover = "rgb(59 130 246)",
            backgroundColorHover= "rgb(219 234 254)"
        } = elementStyle
        const elementStyleContent = elementStyleTemplate
            .replace(/{borderColor}/g, borderColor)
            .replace(/{colorMarker}/g, colorMarker)
            .replace(/{backgroundColor}/g, backgroundColor)
            .replace(/{borderColorHover}/g, borderColorHover)
            .replace(/{colorMarkerHover}/g, colorMarkerHover)
            .replace(/{backgroundColorHover}/g, backgroundColorHover)
        const styleInserted = document.querySelector('#how-do-it-style')
        if( !styleInserted ){
            const style = document.createElement('style')
            style.id = 'how-do-it-style'
            style.innerHTML = elementStyleContent
            document.head.appendChild(style)
        } else {
            styleInserted.innerHTML = elementStyleContent
        }
    },[ elementStyle ])

    useEffect(()=>{
        const all = document.querySelectorAll('[data-howdoit]')
        all.forEach((item, index)=>{
            const btn = document.querySelector(`[data-howdoit-button="${index}"]`)
            if( !btn ) {
                const marker = item.dataset.howdoitMarker || '?'
                const markerHover = item.dataset.howdoitMarkerHover || '?'
                const button = document.createElement('button')
                button.dataset.howdoitButton = index
                button.innerHTML = marker
                button.addEventListener('mouseover', (event)=>{
                    button.innerHTML = markerHover
                })
                button.addEventListener('mouseout', (event)=>{
                    button.innerHTML = marker
                })
                button.addEventListener('click', (event)=>{
                    event.stopPropagation()
                    const { howdoit } = event.target.parentElement.dataset
                    if( howdoit ) {
                        setCurrent(howdoit)
                        ref.current.style.display = 'block'
                        setTimeout(()=>setShow( () =>  true),100)
                    }
                })
                item.appendChild(button)
            }
        })
    },[])

    const values = {}

    const handlerClose = () => setShow(false)

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