
import React from 'react'

type HomeContextType = {
    isOpenDialogTrailer: boolean,
    setIsOpenDialogTrailer: React.Dispatch<React.SetStateAction<boolean>>,
    idBannerSelected: number, 
    setIdBannerSelected: React.Dispatch<React.SetStateAction<number>>
}

const HomeContext = React.createContext<HomeContextType | undefined>(undefined);

export const useHomeContext = () => {
    const context = React.useContext(HomeContext);

    if (!context) {
        throw new Error('useHomeContext must be used within a HomeContextProvider');
    }
    return context;
};

export const HomeProvider = ({children}: {children: React.ReactNode}) => {
    const [isOpenDialogTrailer, setIsOpenDialogTrailer] = React.useState(false);
    const [idBannerSelected, setIdBannerSelected] = React.useState(NaN);

    return (
        <HomeContext.Provider value={{
                                    isOpenDialogTrailer, setIsOpenDialogTrailer,
                                    idBannerSelected, setIdBannerSelected
                                }}
        >
            {children}
        </HomeContext.Provider>
    );
}