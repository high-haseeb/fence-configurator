import { create } from 'zustand';

interface FenceSettings {
    fenceHeight: number;
    fenceWidth: number;
    fenceLength: number;
    fenceType: string;
    fenceColor: string;
    numberOfSides: number;
    enableGates: boolean;
    gateType: string;
    gateLength: number;

    setFenceHeight: (height: number) => void;
    setFenceWidth: (width: number) => void;
    setFenceLength: (length: number) => void;
    setFenceType: (fenceType: string) => void;
    setFenceColor: (fenceColor: string) => void;
    setNumberOfSides: (sides: number) => void;
    setEnableGates: (enableGates: boolean) => void;
    setGateType: (gateType: string) => void;
    setGateLength: (gateLength: number) => void;
}

export const useFenceStore = create<FenceSettings>((set) => ({
    fenceHeight: 1,
    fenceWidth: 10,
    fenceLength: 10,
    numberOfSides: 4,
    enableGates: false,
    gateType: "openable",
    gateLength: 1,
    fenceType: "combs",
    fenceColor: "black",

    setFenceHeight: (height) => set({ fenceHeight: height }),
    setFenceWidth: (width) => set({ fenceWidth: width }),
    setFenceLength: (length) => set({ fenceLength: length }),
    setFenceType: (fenceType) => set({ fenceType }),
    setFenceColor: (fenceColor) => set({ fenceColor }),
    setNumberOfSides: (sides) => set({ numberOfSides: sides }),
    setEnableGates: (enableGates) => set({ enableGates }),
    setGateLength: (gateLength) => set({ gateLength }),
    setGateType: (gateType) => set({ gateType }),
}));
