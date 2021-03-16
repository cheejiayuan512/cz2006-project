import { Range, getTrackBackground } from "react-range";
import React from "react";
const STEP = 30;
const MIN = 0;
const MAX = 1440; //this is to accommodate up to 2359 in hours
const toTimeFormat = (values, index) =>{
    return (Math.floor(values[index]/60)/100).toFixed(2).toString().slice(-2)+':'+((values[index].toFixed(0)%60)/100).toFixed(2).toString().slice(-2);
}
export const Slider = ({setParentData , passParentData}) => {
    const [values, setValues] = React.useState([0, 1440]);
    const testsetValues = (value) =>{
        setValues(value)
        console.log(value)

        setParentData(value)
        console.log(passParentData)
    };
    const rtl = false
    return (
        <div
            className ='m-4'
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}
        >
            <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                rtl={rtl}
                onChange={(values) => testsetValues(values)}
                renderTrack={({ props, children }) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                            ...props.style,
                            height: '36px',
                            display: 'flex',
                            width: '150%'
                        }}
                    >
                        <div
                            ref={props.ref}
                            style={{
                                height: '5px',
                                width: '100%',
                                borderRadius: '4px',
                                background: getTrackBackground({
                                    values,
                                    colors: ['#cccccc', '#548BF4', '#ccc'],
                                    min: MIN,
                                    max: MAX,
                                    rtl
                                }),
                                alignSelf: 'center'
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ index, props, isDragged }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '42px',
                            width: '21px',
                            borderRadius: '4px',
                            backgroundColor: '#FFF',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0px 2px 6px #AAA'
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: '-28px',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                                padding: '4px',
                                borderRadius: '4px',
                                backgroundColor: '#548BF4'
                            }}
                        >
                            {toTimeFormat(values, index)==="24:00"?"00:00":toTimeFormat(values, index)}

                        </div>
                        <div
                            style={{
                                height: '16px',
                                width: '5px',
                                backgroundColor: isDragged ? '#548BF4' : '#CCC'
                            }}
                        />
                    </div>
                )}
            />
        </div>
    );
};
