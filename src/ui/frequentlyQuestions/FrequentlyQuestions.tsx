"use client";

import { Icon } from "@iconify/react";
import {
  aboutFrequentlyQuestionSectionInfo,
  FrequentlyQuestionSectionInfo,
} from "@infos/aboutUsPage/aboutFrequentlyQuestionSection.info";
import { Accordion, AccordionItem } from "@nextui-org/react";
import React from "react";

type FrequentlyQuestionsProperties = {
  questions: FrequentlyQuestionSectionInfo;
};

export default function FrequentlyQuestions({
  questions,
}: FrequentlyQuestionsProperties) {
  return (
    <section className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col items-center w-full max-w-4xl gap-6 mx-auto lg:flex-row lg:items-start lg:gap-12">
        <h2 className="px-2 text-3xl leading-7">
          <span className="inline-block lg:hidden">
            {aboutFrequentlyQuestionSectionInfo.title}
          </span>
        </h2>
        <h2 className="hidden pt-4 text-5xl font-semibold tracking-tight text-transparent bg-primary bg-clip-text dark:to-foreground-200 lg:inline-block">
          {aboutFrequentlyQuestionSectionInfo.titlePart1}
          <br />
          {aboutFrequentlyQuestionSectionInfo.titlePart2}
        </h2>
        <Accordion
          fullWidth
          keepContentMounted
          className="gap-3"
          defaultExpandedKeys={["0"]}
          itemClasses={{
            base: "px-0 sm:px-6",
            title: "font-medium text-xl",
            trigger: "py-6 flex-row-reverse",
            content: "pt-0 pb-6 text-lg text-default-500",
          }}
          items={questions}
          selectionMode="multiple"
        >
          {questions.map((item, index) => (
            <AccordionItem
              key={index}
              indicator={
                <Icon
                  icon="lucide:plus"
                  width={24}
                  style={{ color: "#C19843" }}
                />
              }
              title={item.title}
            >
              {item.content}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
