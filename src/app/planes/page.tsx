"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Precios from './Precios';

export default function Home() {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen">
            <Precios/>

        </div>
    );
}