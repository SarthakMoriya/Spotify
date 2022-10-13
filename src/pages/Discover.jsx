import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetSongsByGenreQuery } from "../redux/services/shazamCore";
import {useSelector ,useDispatch } from 'react-redux';
import { selectGenreListId } from "../redux/features/playerSlice";

const Discover = () => {
  const dispatch=useDispatch();
  const {activeSong,isPlaying,genreListId}=useSelector((state)=> state.player) // properties states initial...
  const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');
  
  
  if (isFetching) return <Loader title="Loading Songs..." />;
  if (error) return <Error title="Something went Wrong. Please try again!" />;
  const genreTitle = genres.find(({value})=>value === genreListId)?.title;


  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col justify-between items-center  sm:flex-row  mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={(e) => {dispatch(selectGenreListId(e.target.value))}}
          value={genreListId || 'pop'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres?.map((item) => (
            <option value={item.value} key={item.value}>
              {item.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard 
              key={song.key} 
              song={song} 
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
              />
        ))}
      </div>
    </div>
  );
};

export default Discover;
