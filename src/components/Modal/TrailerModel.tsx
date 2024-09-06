import React from 'react'
import { CloseIcon } from '../Icon'
import cx from 'classnames';

export const TrailerModel = () => {

    const [isOpen, setIsOpen] = React.useState(true);

    return (
    <div className={cx("fixed","top-0 bottom-0 left-0 right-0 bg-black/40 py-16 md:py-64 lg:py-16 z-[60]",{"hidden": !isOpen})}>
        <div className="relative max-w-screen-md bg-black-main h-full z-50 mx-auto p-8">
            <CloseIcon width={'32px'} height={'32px'} className="absolute top-1 right-1 cursor-pointer hover:text-slate-500" onClick={() => setIsOpen(false)} />
            <iframe src='https://www.youtube.com/watch?v=hxHLgKEw0d0&list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbAVMhxHLgKEw0d0&start_radio=1' className="w-full h-full"></iframe>
        </div>
    </div>
    )
}
