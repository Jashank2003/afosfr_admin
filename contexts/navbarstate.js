import {create} from 'zustand';

const useNavbarstate = create((set) => ({
    showNavbar: true,
    setShowNavbar: (value) =>
      set((state) => ( {showNavbar: value} )),
   
  }));
  
  export default useNavbarstate;