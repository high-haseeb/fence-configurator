import { Experience } from "@/components/Scene";
import Image from "next/image";

export default function HomePage() {
    return (
        <div className="w-full h-screen bg-[#181818] text-white">
            <Experience/>
            <Branding/>
        </div>
    );
}

const Branding = () => {
    return (
        <Image src="/high-house-logo.png" width={100} height={100} alt="high-house-logo" className="absolute top-4 left-4 invert"/>
    )
}
