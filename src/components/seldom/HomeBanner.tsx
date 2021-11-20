import BannerSwiper from "@/components/seldom/BannerSwiper";
import CircleButton from "@/components/shared/CircleButton";
import DotList from "@/components/shared/DotList";
import Image from "@/components/shared/Image";
import { SwiperProps } from "@/components/shared/Swiper";
import TextIcon from "@/components/shared/TextIcon";
import HomeBannerSkeleton from "@/components/skeletons/HomeBannerSkeleton";

import useTrendingAnime from "@/hooks/useTrendingAnime";

import { numberWithCommas } from "@/utils";
import { convert } from "@/utils/anime";

import { Anime } from "@/types";

import { useRouter } from "next/router";
import React, { useState } from "react";

import { AiFillHeart, AiFillPlayCircle } from "react-icons/ai";
import { MdTagFaces } from "react-icons/md";
import Button from "../shared/Button";

interface HomeBannerProps {
  anime: Anime[];
}

const HomeBanner: React.FC<HomeBannerProps> = ({ anime }) => {
  const router = useRouter();

  const [index, setIndex] = useState<number>(0);

  const activeAnime = anime[index];

  const handleSlideChange: SwiperProps["onSlideChange"] = (swiper) => {
    setIndex(swiper.realIndex);
  };

  return (
    <React.Fragment>
      <div className="group relative w-full h-[320px] md:h-[500px]">
        {activeAnime.banner_image && (
          <Image
            src={activeAnime.banner_image}
            layout="fill"
            objectFit="cover"
            objectPosition="50% 35%"
            alt={`${activeAnime.title.user_preferred} banner`}
          />
        )}

        <div className="banner__overlay absolute inset-0 flex flex-col justify-center px-4 md:px-12">
          <div className="w-full md:w-[45%]">
            <h1 className="text-2xl md:text-4xl uppercase font-bold line-clamp-2 sm:line-clamp-3 md:line-clamp-4">
              {activeAnime.title.user_preferred}
            </h1>

            <div className="text-lg mt-4 flex flex-wrap items-center gap-x-8">
              <TextIcon LeftIcon={MdTagFaces} iconClassName="text-green-300">
                <p>{activeAnime.average_score}%</p>
              </TextIcon>

              <TextIcon LeftIcon={AiFillHeart} iconClassName="text-red-400">
                <p>{numberWithCommas(activeAnime.favourites)}</p>
              </TextIcon>

              <DotList>
                {activeAnime.genres.slice(0, 3).map((genre) => (
                  <p key={genre}>{convert(genre, "genre")}</p>
                ))}
              </DotList>
            </div>

            <p className="hidden md:block mt-2 text-base text-typography-secondary md:line-clamp-5">
              {activeAnime.description}
            </p>

            <Button
              primary
              LeftIcon={AiFillPlayCircle}
              onClick={() => {
                router.push(`/details/${activeAnime.ani_id}`);
              }}
              className="md:hidden mt-4"
            >
              <p>Xem ngay</p>
            </Button>
          </div>
        </div>

        <CircleButton
          LeftIcon={AiFillPlayCircle}
          onClick={() => {
            router.push(`/details/${activeAnime.ani_id}`);
          }}
          outline
          className="hidden md:block absolute left-2/3 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
          iconClassName="w-16 h-16"
        />

        <div className="banner__overlay--down absolute bottom-0 h-16 w-full"></div>
      </div>
      <div className="px-4 md:px-12 pb-12 w-full">
        <BannerSwiper onSlideChange={handleSlideChange} data={anime} />
      </div>
    </React.Fragment>
  );
};

export default HomeBanner;
