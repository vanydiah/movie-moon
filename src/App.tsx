import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import PersonPage from "./pages/PersonPage";
import PersonDetails from "./components/person/PersonDetails";
import MediaDetails from "./components/media/MediaDetails";
import MediaPage from "./pages/MediaPage";
import SearchPage from "./pages/SearchPage";
import MediaCastDetails from "./components/media/MediaCastDetails";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/movie/popular" element={<MediaPage />} />
        <Route path="/movie/trending" element={<MediaPage />} />
        <Route path="/movie/now-playing" element={<MediaPage />} />
        <Route path="/movie/:mediaId" element={<MediaDetails />} />

        <Route path="/tv/popular" element={<MediaPage />} />
        <Route path="/tv/trending" element={<MediaPage />} />
        <Route path="/tv/:mediaId" element={<MediaDetails />} />
        <Route
          path="/:mediaType/:mediaId/cast"
          element={<MediaCastDetails />}
        />

        <Route path="/person" element={<PersonPage />} />
        <Route path="/person/:personId" element={<PersonDetails />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
