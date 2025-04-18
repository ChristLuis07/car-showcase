"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CarProps } from '@/types';
import CustomButton from './CustomButton';
import { calculateCarRent, generateCarImageUrl } from '@/utils';
import CarDetails from './CarDetails';

interface CarCardProps {
  car: CarProps;
}

const fallbackMPG: Record<string, number> = {
  "toyota_corolla": 23,
  "porsche_carrera": 25,
  "honda_civic": 28,
};

// Function to generate random number between min and max (inclusive)
const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function CarCard({ car }: CarCardProps) {
  const { city_mpg, year, make, model, transmission, drive } = car;

  const key = `${make.toLowerCase()}_${model.toLowerCase()}`;
  
  const [mpgValue, setMpgValue] = useState<number>(0);
  
  useEffect(() => {
    if (typeof city_mpg === "string" && city_mpg === "this field is for premium subscribers only") {
      setMpgValue(getRandomNumber(19, 50));
    } else if (typeof city_mpg === "number") {
      setMpgValue(city_mpg);
    } else {
      setMpgValue(fallbackMPG[key] || 20);
    }
  }, [city_mpg, key]);

  const carRent = calculateCarRent(mpgValue, Number(year));
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>
      <p className="flex mt-6 text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {carRent}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p>

      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={generateCarImageUrl(car)}
          alt="car model"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/steering-wheel.svg" width={20} height={20} alt="steering wheel" />
            <p className="text-[14px] leading-[17px] font-bold">
              {transmission === 'a' ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/tire.svg" width={20} height={20} alt="tire" />
            <p className="text-[14px] leading-[17px] font-bold">
              {drive.toUpperCase()}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/gas.svg" width={20} height={20} alt="gas" />
            <p className="text-[14px] leading-[17px] font-bold">
              {mpgValue} MPG
            </p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </div>
  );
}

export default CarCard;