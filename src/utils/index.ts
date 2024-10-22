import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
    return twMerge(classNames(inputs));
}
