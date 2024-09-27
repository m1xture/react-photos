import { Component } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loadmore from "./components/Loadmore/Loadmore";
import "./index.css";
import Modal from "./components/Modal/Modal";
class App extends Component {
  state = {
    images: [],
    searchValue: "",
    lastPage: 0,
    selectedImgObj: { path: false, desc: "lala" },
    loadedMore: false,
  };
  componentDidMount = async () => {
    if (this.state.lastPage === 0) await this.loadImages(1);
    document.addEventListener("keydown", (e) => {
      if (e.code.toUpperCase() === "ESCAPE" && this.state.selectedImgObj.path) {
        this.closeModal({ target: { dataset: { overlay: true } } });
      }
    });
  };
  loadImages = async (type) => {
    const resp = await fetch(
      `https://pixabay.com/api/?q=${this.state.searchValue}&page=${
        this.state.lastPage + 1
      }&key=${
        process.env.REACT_APP_API_KEY
      }&image_type=photo&orientation=horizontal&per_page=12`
    );
    const result = await resp.json();
    console.log(result);
    if (type === 2) {
      console.log("fdsf", this.state.images.length);
      const allImages = [...this.state.images, ...result.hits];
      this.setState({ images: allImages, lastPage: this.state.lastPage + 1 });
      return;
    }
    this.setState({ images: result.hits, lastPage: 1 });
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
    this.setState({ selectedImgObj: {} });
  };
  render() {
    return (
      <>
        <ImageGallery images={this.state.images} openModal={this.openModal} />
        {this.state.selectedImgObj.path && (
          <Modal
            closeModal={this.closeModal}
            path={this.state.selectedImgObj.path}
            desc={this.state.selectedImgObj.desc}
          />
        )}
        <Loadmore updatePage={this.updatePage} />
      </>
    );
  }
}

export default App;
