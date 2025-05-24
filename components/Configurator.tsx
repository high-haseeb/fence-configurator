"use client";
import { useFenceStore } from "@/store/fenceStore";
import React, { useState } from 'react';

export const Configurator = () => {
    const { 
        fenceLength,
        fenceWidth,
        fenceHeight,
        fenceType,
        fenceColor,
        setFenceColor,
        setFenceType,
        numberOfSides,
        enableGates,
        gateType,
        setGateType,
        gateLength,
        setGateLength,
        setFenceWidth,
        setFenceLength,
        setFenceHeight,
        setNumberOfSides,
        setEnableGates
    } = useFenceStore();

    return (
        <div className="flex flex-col gap-8 p-8 text-gray-900 w-full overflow-y-scroll h-screen">
            <div className="text-3xl font-semibold">
                Configure your fence
            </div>

            <section>
                <div className="block mb-1 text-lg font-semibold text-gray-700">Number of sides</div>
                <div className="flex gap-2 w-full">
                    {Array.from({ length: 4 }).map((_, i) => {
                        const sidesNum = i + 1;
                        const isActive = numberOfSides === sidesNum;
                        return (
                            <button
                                key={`set-sides-${i}-button`}
                                onClick={() => setNumberOfSides(sidesNum)}
                                className={`text-lg font-semibold px-3 py-1 ${isActive ? "flex-grow bg-primary text-secondary rounded-3xl" : "bg-secondary text-primary w-1/6 rounded-md"} transition-all`}
                                aria-pressed={isActive}
                            >
                                {sidesNum}
                            </button>
                        );
                    })}
                </div>
            </section>

            <section>
                <div className="block mb-1 text-lg font-semibold text-gray-700">Width</div>
                <RangeSlider value={fenceWidth} setValue={setFenceWidth}/>
            </section>

            <div>
                <div className="block mb-1 text-lg font-semibold text-gray-700">Length</div>
                <RangeSlider value={fenceLength} setValue={setFenceLength}/>
            </div>
            <section>
                <div className="block mb-1 text-lg font-semibold text-gray-700">Fence Height</div>
                <div className="flex gap-2 w-full">
                    {Array.from({ length: 2 }).map((_, i) => {
                        const isActive = i + 1 === fenceHeight;
                        return (
                            <button
                                key={`set-fenceHeight-${i}-button`}
                                onClick={() => setFenceHeight(i + 1)}
                                className={`text-lg font-semibold px-3 py-1 ${isActive ? "flex-grow bg-primary text-secondary rounded-3xl" : "bg-secondary text-primary w-1/6 rounded-md"} transition-all`}
                                aria-pressed={isActive}
                            >
                                {i + 1} m
                            </button>
                        );
                    })}
                </div>
            </section>

            <section className="flex items-center justify-between">
                <div className="block text-lg font-semibold text-gray-700">Do you want gates?</div>
                <ToggleSwitch initial={enableGates} onToggle={setEnableGates}/>
            </section>
            { enableGates && <>
                <section className="">
                    <div className="block text-lg mb-1 font-semibold text-gray-700">Gate type</div>
                    <div className="flex gap-2 w-full">
                        {["openable", "sliding"].map((gateTypeOption, i) => {
                            const isActive = gateTypeOption === gateType;
                            return (
                                <button
                                    key={`set-fenceHeight-${i}-button`}
                                    onClick={() => setGateType(gateTypeOption)}
                                    className={`text-lg font-semibold px-3 py-1 ${isActive ? "flex-grow bg-primary text-secondary rounded-3xl" : "bg-secondary text-primary min-w-1/6 rounded-md"} transition-all`}
                                    aria-pressed={isActive}
                                >
                                    {gateTypeOption}
                                </button>
                            );
                        })}
                    </div>
                </section>

            <section>
                <div className="block mb-1 text-lg font-semibold text-gray-700">Gate length</div>
                <div className="flex gap-2 w-full">
                    {[3, 4, 5, 6].map((gateLengthOption, i) => {
                        const isActive = gateLengthOption === gateLength;
                        return (
                            <button
                                key={`set-sides-${i}-button`}
                                onClick={() => setGateLength(gateLengthOption)}
                                className={`text-lg font-semibold px-3 py-1 ${isActive ? "flex-grow bg-primary text-secondary rounded-3xl" : "bg-secondary text-primary w-1/6 rounded-md"} transition-all`}
                                aria-pressed={isActive}
                            >
                                {gateLengthOption} m
                            </button>
                        );
                    })}
                </div>
            </section>
            </>
            }

            <section className="">
                <div className="block text-lg mb-1 font-semibold text-gray-700">Fence Type</div>
                <div className="flex flex-col gap-2 w-full">
                    {["combs", "rhombus", "segmental"].map((fenceTypeOption, i) => {
                        const isActive = fenceTypeOption === fenceType;
                        return (
                            <button
                                key={`set-fenceHeight-${i}-button`}
                                onClick={() => setFenceType(fenceTypeOption)}
                                className={`text-lg font-semibold px-3 py-1 ${isActive ? "flex-grow bg-primary text-secondary rounded-3xl" : "bg-secondary text-primary min-w-1/6 rounded-md"} transition-all`}
                                aria-pressed={isActive}
                            >
                                {fenceTypeOption}
                            </button>
                        );
                    })}
                </div>
            </section>

            <section className="">
                <div className="block text-lg mb-1 font-semibold text-gray-700">Fence Color</div>
                <div className="flex gap-2 w-full">
                    {["black", "gray", "brown"].map((fenceColorOption, i) => {
                        const isActive = fenceColorOption === fenceColor;
                        return (
                            <button
                                key={`set-fenceHeight-${i}-button`}
                                onClick={() => setFenceColor(fenceColorOption)}
                                className={`text-lg font-semibold px-3 py-1  ${ isActive ? "flex-grow rounded-3xl" : "min-w-1/6 rounded-md"} transition-all`}
                                style={{ backgroundColor: fenceColorOption }}
                                aria-pressed={isActive}
                            >
                                <div className="text-secondary">{fenceColorOption}</div>
                            </button>
                        );
                    })}
                </div>
            </section>

            <section className="flex items-center justify-between">
                <div className="block text-lg font-semibold text-gray-700">Do you want a console?</div>
                <ToggleSwitch initial={false} onToggle={(e) => console.log(e)}/>
            </section>

            <section className="flex items-center justify-between">
                <div className="block text-lg font-semibold text-gray-700">Is a foundation needed?</div>
                <ToggleSwitch initial={false} onToggle={(e) => console.log(e)}/>
            </section>
        </div>
    );
};

const RangeSlider = ({ value, setValue }: {value: number; setValue: (value: number) => void;}) => {
    const handleChange = (e: any) => setValue(Number(e.target.value));

    const getBackground = () => (`linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${value*2.0}%, var(--color-secondary) ${value*2.0}%, var(--color-secondary) 100%)`);

    return (
        <div className="relative">
            <div className="absolute left-2 bottom-1 z-10 font-semibold text-secondary">{value}m</div>
            <input
                type="range" min="0" max="50"
                value={value} onChange={handleChange}
                style={{
                    appearance: "none",
                    width: "100%",
                    height: "20px",
                    borderRadius: "6px",
                    background: getBackground(),
                    outline: "none",
                    cursor: "pointer",
                }}
            />
        </div>
    );
};

interface ToggleSwitchProps {
    initial?: boolean;
    onToggle?: (state: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ initial = false, onToggle }) => {
    const [enabled, setEnabled] = useState(initial);

    const toggle = () => {
        const newState = !enabled;
        setEnabled(newState);
        onToggle?.(newState);
    };

    return (
        <button
            onClick={toggle}
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${enabled ? 'bg-primary' : 'bg-secondary'}`}
        >
            <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-0'}`}
            />
        </button>
    );
};

export default ToggleSwitch;
