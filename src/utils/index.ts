import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
    return twMerge(classNames(inputs));
}

export async function checkLinkImage(imageLink: string): Promise<boolean> {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = imageLink;

        img.onload = () => {
            resolve(true);
        };

        img.onerror = () => {
            resolve(false);
        };
    });
}
