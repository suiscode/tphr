"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Home() {
  const [rotationClockwise, setRotationClockwise] = useState<number>(0);
  const [rotationCounterClockwise, setRotationCounterClockwise] =
    useState<number>(0);

  const handleMouseMove = (event: any) => {
    const rotationSpeed = 0.03;
    const newRotationClockwise =
      rotationClockwise + ((event.clientX * rotationSpeed) % 360);
    const newRotationCounterClockwise =
      rotationCounterClockwise - ((event.clientX * rotationSpeed) % 360);

    setRotationClockwise(newRotationClockwise);
    setRotationCounterClockwise(newRotationCounterClockwise);
  };
  return (
    <div
      className="w-screen  px-8 text-black min-h-screen
    
    
     lg:items-center lg:flex lg:max-2xl:flex-col lg:max-2xl:gap-8
    2xl:flex 2xl:border-4 2xl:items-center 2xl:justify-center 2xl:relative  2xl:p-10"
    >
      <div className="w-full 2xl:text-start lg:max-2xl:gap-4 2xl:w-1/2 sm:max-lg:h-screen justify-around sm:max-lg:items-center text-center flex flex-col">
        <h1 className="2xl:text-[100px] text-[80px] w-full font-semibold leading-tight">
          HUMAN RESOURCES
        </h1>
        <p className="text-2xl text-primary/70">
          Harness the power of technology to transform your human resources
          experience—our cutting-edge solutions simplify processes, enhance
          accuracy, and free up your team to focus on what truly matters: the
          people.
        </p>
        <Link href="/profile">
          <Button
            className="rounded-3xl border-2 text-xl px-8 py-10"
            variant={"outline"}
            onMouseMove={handleMouseMove}
          >
            Start right now
          </Button>
        </Link>
      </div>
      <div className="relative  hidden lg:flex 2xl:flex w-[1000px] h-[640px]">
        <div className="w-12 h-12 absolute top-[10px] left-[240px] border-blue-700 border-2 rounded-full animate-bounce delay-300"></div>
        <div className="w-8 h-8 absolute top-[100px] left-[440px] bg-blue-400 rounded-full animate-bounce delay-100"></div>
        <div className="w-16 h-16 absolute bottom-[10px] right-[240px] border-blue-700 border-2 rounded-full animate-bounce delay-200"></div>

        <div
          className="bottom-[30px]  rotate-12 left-[40px] absolute -z-10 w-[360px] h-[360px]"
          style={{ transform: `rotate(${rotationClockwise}deg)` }}
        >
          <div className="border-blue-800 border-2 border-dashed w-full h-full rounded-full">
            <div className="w-8 h-8 absolute top-[90px] bg-red-400 rounded-full"></div>
            <div className="w-8 h-8 absolute top-[240px] right-1 bg-blue-400 rounded-full"></div>
          </div>
        </div>
        <div
          className="top-[30px] rotate-12 right-[40px] absolute -z-10 w-[360px] h-[360px]"
          style={{ transform: `rotate(${rotationCounterClockwise}deg)` }}
        >
          <div className="border-blue-800 border-2 border-dashed w-full h-full rounded-full">
            <div className="w-8 h-8 absolute top-[160px] right-[-14px] bg-orange-400 rounded-full"></div>
          </div>
        </div>
        <Image
          src="https://pub-9e4a462638ff4a6e89664b9e0dd86ca5.r2.dev/hshake.png"
          fill
          className="absolute"
          alt="handshake"
        />
      </div>
    </div>
  );
}
