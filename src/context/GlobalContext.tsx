
import React from 'react'

const menus = [
    {
      id: 0,
      title: "Home",
      href: "/",
      isActive: false
    },
    {
      id: 1,
      title: "Movie",
      href: "/movie",
      isActive: false
    },
    {
      id: 2,
      title: "TV Series",
      href: "/tv",
      isActive: false
    },
];

type MenuItemType = {
    id: number,
    title: string,
    href: string,
    isActive: boolean
}

type GlobalContextType = {
    menuItems: MenuItemType[],
    setMenuItems:  React.Dispatch<React.SetStateAction<{
        id: number;
        title: string;
        href: string;
        isActive: boolean;
    }[]>>
}


const GlobalContext = React.createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
    const context = React.useContext(GlobalContext);

    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalContextProvider');
    }
    return context;
};

export const GlobalProvider = ({children}: {children: React.ReactNode}) => {
    const [menuItems, setMenuItems] = React.useState<MenuItemType[]>(menus);

    return (
        <GlobalContext.Provider value={{
                                    menuItems, setMenuItems
                                }}
        >
            {children}
        </GlobalContext.Provider>
    )
}