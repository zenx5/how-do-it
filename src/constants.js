export const elementStyleTemplate = `
        *[data-howdoit] {
            position: relative;
            border: 4px solid {borderColor};

            &:hover{
                border: 4px solid {borderColorHover};
            }

            button[data-howdoit-button] {
                position: absolute;
                right: -1rem;
                height: 1.25rem;
                width: 1.25rem;
                cursor: pointer;
                border-radius: 9999px;
                background-color: {backgroundColor};
                padding: 0px;
                text-align: center;
                font-size: 0.875rem;
                line-height: 1.25rem;
                color: {colorMarker};
                &:hover{
                    color: {colorMarkerHover};
                }
            }
        }`