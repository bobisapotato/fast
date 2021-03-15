import { STORY_RENDERED } from "@storybook/core-events";
import addons from "@storybook/addons";
import TooltipTemplate from "./fixtures/base.html";
import type { FASTTooltip } from "./index";
import "../button";
import "./index";

function onShowClick(): void {
    for (let i = 1; i <= 4; i++) {
        const tooltipInstance = document.getElementById(
            `tooltip-show-${i}`
        ) as FASTTooltip;
        tooltipInstance.visible = !tooltipInstance.visible;
    }
}

function onAnchorMouseEnter(e: MouseEvent): void {
    if (!e.target) {
        return;
    }

    const tooltipInstance = document.getElementById(
        "tooltip-anchor-switch"
    ) as FASTTooltip;
    tooltipInstance.anchorElement = e.target as HTMLElement;
}

addons.getChannel().addListener(STORY_RENDERED, (name: string) => {
    if (name.toLowerCase().startsWith("tooltip")) {
        document
            .querySelectorAll("fast-button[id^=anchor-anchor-switch]")
            .forEach((el: HTMLElement) => {
                el.addEventListener("mouseenter", onAnchorMouseEnter);
            });

        const showButton = document.getElementById("anchor-show") as HTMLElement;
        showButton.addEventListener("click", onShowClick);
    }
});

export default {
    title: "Tooltip",
};

export const Tooltip = () => TooltipTemplate;
