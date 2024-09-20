
import React from 'react'

const menus = [
    {
      id: 0,
      title: "Home",
      href: "/",
      isActive: true
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

type HeaderContextType = {
    menuItems: MenuItemType[],
    setMenuItems:  React.Dispatch<React.SetStateAction<{
        id: number;
        title: string;
        href: string;
        isActive: boolean;
    }[]>>
}

const HeaderContext = React.createContext<HeaderContextType | undefined>(undefined);

export const useHeaderContext = () => {
    const context = React.useContext(HeaderContext);

    if (!context) {
        throw new Error('useHeaderContext must be used within a HeaderContextProvider');
    }
    return context;
};

export const HeaderProvider = ({children}: {children: React.ReactNode}) => {
    const [menuItems, setMenuItems] = React.useState<MenuItemType[]>(menus);

    return (
        <HeaderContext.Provider value={{
                                    menuItems, setMenuItems
                                }}
        >
            {children}
        </HeaderContext.Provider>
    );
}