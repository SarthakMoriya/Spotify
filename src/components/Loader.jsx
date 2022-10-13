import {loader} from '../assets'

const Loader = (props) => (
  <div className="w-full flex jutify-center items-center flex-col">
    <img src={loader} alt="Loader" className="w-32 h-32 object-contain"/>
    <h1 className="font-bold text-2xl">{props.title || "Loading Songs..."}</h1>
    </div>
);

export default Loader;
