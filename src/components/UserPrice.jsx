import React, {useState} from "react";
import { Range, getTrackBackground } from "react-range";

const UserPrice = ({sendDataToParent}) => {
    const STEP = 1;
    const MIN = 0;
    const MAX = 4;
    const [values, setValues] = React.useState([0,4]);
    function handleChangePriceRange (userValues){
        setValues(userValues);
        sendDataToParent({userValues})
    }
    function toDollarFormat (values, index) {
        if (values[index]===0){
            return '$'
        } else if (values[index]===1) {
            return '$$'
        } else if (values[index]===2) {
            return '$$$'
        } else if (values[index]===3) {
            return '$$$$'
        } else if (values[index]===4) {
            return '$$$$$'
        }
    }
    return (
        <div
            className ='m-4'
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}
        >
                <Range values={values} step={STEP} min={MIN} max={MAX} onChange={handleChangePriceRange} renderTrack={({ props, children }) => (
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
                                    colors: ['#ccc', '#548BF4', '#ccc'],
                                    min: MIN,
                                    max: MAX
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
                            {toDollarFormat(values,index)}

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

export default UserPrice;
