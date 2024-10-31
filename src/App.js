import { Component, useCallback, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loadmore from "./components/Loadmore/Loadmore";
import Searchbar from "./components/Searchbar/Searchbar";
import Loader from "./components/Loader/Loader";
import "./index.css";
import Modal from "./components/Modal/Modal";
class App2 extends Component {
  state = {
    images: [],
    searchValue: "",
    lastPage: 0,
    selectedImgObj: { path: false, desc: "lala" },
    loadedMore: false,
    isLoading: false,
    errors: [],
  };
  componentDidMount = async () => {
    if (this.state.lastPage === 0) await this.loadImages(1);
    document.addEventListener("keydown", (e) => {
      if (e.code.toUpperCase() === "ESCAPE" && this.state.selectedImgObj.path) {
        this.closeModal({ target: { dataset: { overlay: true } } });
      }
    });
  };
  componentDidUpdate = async (prevProps, prevState) => {
    console.log(this.state.errors.length, "prev");
    if (this.state.errors.length !== 0) {
      console.log("upderror");
      console.log(this.state.errors[0].message);
      toast.error(this.state.errors[0].message);
      return;
    }
    if (this.state.isLoading) return;
    console.log(this.state.errors.length, "lengthupd");

    if (!this.state.searchValue && this.state.lastPage === 0) {
      return await this.loadImages(1);
    }
    if (this.state.searchValue && this.state.lastPage === 0) {
      await this.loadImages(1);
    }
  };
  loadImages = async (type) => {
    this.setState({ isLoading: true, errors: [] });
    try {
      const resp = await fetch(
        `https://pixabay.com/api/?q=${this.state.searchValue}&page=${
          this.state.lastPage + 1
        }&key=${
          process.env.REACT_APP_API_KEY
        }&image_type=photo&orientation=horizontal&per_page=12`
      );
      const result = await resp.json();
      console.log(result, "res");
      if (result.hits.length < 12) {
        document.querySelector("[data-loadmore]").style.display = "none";
        if (document.querySelector("[data-loadmore]")) {
          document.querySelector("[data-loadmore]").disabled = true;
          // return;
        }
      }
      if (result.hits.length === 0) {
        console.log(result.hits);
        this.setState({ isLoading: false });
        // if (document.querySelector("[data-loadmore]")) {
        //   document.querySelector("[data-loadmore]").disabled = true;
        // }
        throw new Error("No results found💤");
      } else {
        // this.setState({ errors: [] });
      }
      if (type === 3) {
        // console.log(result);
        this.setState({
          images: [...result.hits],
          lastPage: 1,
          isLoading: false,
          errors: [],
        });
        return;
      }
      if (type === 2) {
        console.log("fdsf", this.state.images.length);
        const allImages = [...this.state.images, ...result.hits];
        this.setState({
          images: allImages,
          lastPage: this.state.lastPage + 1,
          isLoading: false,
          errors: [],
        });
        return;
      }
      this.setState({
        images: result.hits,
        lastPage: 1,
        isLoading: false,
        errors: [],
      });
      // if (this.state.searchValue) {
      //   this.setState({ searchValue: "" });
      // }
    } catch (err) {
      this.setState({ errors: [err], images: [] });
      console.log("errorblock0");
    }
  };
  updatePage = async () => {
    console.log("lala");
    await this.loadImages(2);
  };
  openModal = (e) => {
    if (e.target === e.currentTarget) return;
    const imgEl = e.target.src ? e.target : e.target.querySelector("img");
    if (!imgEl) return;
    console.log(imgEl);
    this.setState({
      selectedImgObj: { path: imgEl.dataset.src, desc: imgEl.alt },
    });
  };
  closeModal = (e) => {
    if (!e.target.dataset.overlay) return;
    document
      .querySelector("[data-overlay]")
      .animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 400,
        iterations: 1,
      });
    document.querySelector("[data-overlay]").style.opacity = 0;
    setTimeout(() => {
      this.setState({ selectedImgObj: {} });
    }, 410);
  };
  searchPhotos = async (e) => {
    const inputEl = document.querySelector("[data-search-input]");
    if (inputEl.value === this.state.searchValue) return;
    this.setState({
      searchValue: inputEl.value.trim(),
      lastPage: 0,
      errors: [],
    });
    inputEl.value = "";
  };
  render() {
    return (
      <>
        <Searchbar searchPhotos={this.searchPhotos} />
        {this.state.isLoading && this.state.errors.length === 0 && <Loader />}
        <ImageGallery images={this.state.images} openModal={this.openModal} />
        {this.state.selectedImgObj.path && (
          <Modal
            closeModal={this.closeModal}
            path={this.state.selectedImgObj.path}
            desc={this.state.selectedImgObj.desc}
          />
        )}
        {this.state.errors.length === 0 && (
          <Loadmore updatePage={this.updatePage} />
        )}
        <ToastContainer />
      </>
    );
  }
}

const App = () => {
  //? state

  const [searchValue, setSearchValue] = useState("");
  const [lastPage, setLastPage] = useState(0);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImgObj, setSelectedImgObj] = useState({});
  const SearchInputRef = useRef();

  //? cbs

  const loadImages = useCallback(async (type) => {
    // this.setState({ isLoading: true, errors: [] });
    setIsLoading(true);
    setErrors([]);

    try {
      const resp = await fetch(
        `https://pixabay.com/api/?q=${searchValue}&page=${lastPage + 1}&key=${
          process.env.REACT_APP_API_KEY
        }&image_type=photo&orientation=horizontal&per_page=12`
      );
      const result = await resp.json();
      console.log(result, "res");
      if (result.hits.length < 12) {
        document.querySelector("[data-loadmore]").style.display = "none";
        if (document.querySelector("[data-loadmore]")) {
          document.querySelector("[data-loadmore]").disabled = true;
          // return;
        }
      }
      if (result.hits.length === 0) {
        console.log(result.hits);
        // this.setState({ isLoading: false });
        setIsLoading(false);
        // if (document.querySelector("[data-loadmore]")) {
        //   document.querySelector("[data-loadmore]").disabled = true;
        // }
        throw new Error("No results found💤");
      } else {
        // this.setState({ errors: [] });
      }
      if (type === 3) {
        // console.log(result);
        // this.setState({
        //   images: [...result.hits],
        //   lastPage: 1,
        //   isLoading: false,
        //   errors: [],
        // });
        setImages([...result.hits]);
        setLastPage(1);
        setIsLoading(false);
        setErrors([]);
        return;
      }
      if (type === 2) {
        console.log("fdsf", images.length);
        const allImages = [...images, ...result.hits];
        // this.setState({
        //   images: allImages,
        //   lastPage: lastPage + 1,
        //   isLoading: false,
        //   errors: [],
        // });
        setImages(allImages);
        setLastPage(lastPage + 1);
        setIsLoading(false);
        setErrors([]);
        return;
      }
      // this.setState({
      //   images: result.hits,
      //   lastPage: 1,
      //   isLoading: false,
      //   errors: [],
      // });
      setImages(result.hits);
      setLastPage(1);
      setIsLoading(false);
      setErrors([]);
      // if (this.state.searchValue) {
      //   this.setState({ searchValue: "" });
      // }
    } catch (err) {
      // this.setState({ errors: [err], images: [] });
      setErrors([err]);
      setImages([]);
      console.log("errorblock0");
    }
  });

  const searchPhotos = useCallback(async () => {
    const inputEl = SearchInputRef.current;
    if (inputEl.value === searchValue) return;
    // this.setState({
    //   searchValue: inputEl.value.trim(),
    //   lastPage: 0,
    //   errors: [],
    // });
    setSearchValue(inputEl.value.trim());
    setLastPage(0);
    setErrors([]);
    inputEl.value = "";
  });

  const openModal = useCallback((e) => {
    if (e.target === e.currentTarget) return;
    const imgEl = e.target.src ? e.target : e.target.querySelector("img");
    if (!imgEl) return;
    console.log(imgEl);
    // this.setState({
    //   selectedImgObj: { path: imgEl.dataset.src, desc: imgEl.alt },
    // });
    setSelectedImgObj({ path: imgEl.dataset.src, desc: imgEl.alt });
  });

  const closeModal = useCallback((e) => {
    if (!e.target.dataset.overlay) return;
    document
      .querySelector("[data-overlay]")
      .animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 400,
        iterations: 1,
      });
    document.querySelector("[data-overlay]").style.opacity = 0;
    setTimeout(() => {
      // this.setState({ selectedImgObj: {} });
      setSelectedImgObj({});
    }, 410);
  });

  const updatePage = async () => {
    await loadImages(2);
  };

  //? life cycle

  useEffect(() => {
    const cb = async () => {
      if (lastPage === 0) await loadImages(1);
      document.addEventListener("keydown", (e) => {
        if (e.code.toUpperCase() === "ESCAPE" && selectedImgObj.path) {
          closeModal({ target: { dataset: { overlay: true } } });
        }
      });
    };
    cb();
  }, []);

  // console.log(this.state.errors.length, "prev");
  // if (this.state.errors.length !== 0) {
  //   console.log("upderror");
  //   console.log(this.state.errors[0].message);
  //   toast.error(this.state.errors[0].message);
  //   return;
  // }
  // if (this.state.isLoading) return;
  // console.log(this.state.errors.length, "lengthupd");

  // if (!this.state.searchValue && this.state.lastPage === 0) {
  //   return await this.loadImages(1);
  // }
  // if (this.state.searchValue && this.state.lastPage === 0) {
  //   await this.loadImages(1);
  // }

  useEffect(() => {
    if (errors.length !== 0) {
      toast.error(errors[0].message);
      return;
    }
  }, [errors]);

  useEffect(() => {
    const cb = async () => {
      if (!searchValue && lastPage === 0) {
        return await loadImages(1);
      }
      if (searchValue && lastPage === 0) {
        return await loadImages(1);
      }
    };
    cb();
  }, [searchValue, lastPage]);

  return (
    <>
      <Searchbar searchPhotos={searchPhotos} input={SearchInputRef} />
      {isLoading && errors.length === 0 && <Loader />}
      <ImageGallery images={images} openModal={openModal} />
      {selectedImgObj.path && (
        <Modal
          closeModal={closeModal}
          path={selectedImgObj.path}
          desc={selectedImgObj.desc}
        />
      )}
      {errors.length === 0 && <Loadmore updatePage={updatePage} />}
      <ToastContainer />
    </>
  );
};

export default App;
