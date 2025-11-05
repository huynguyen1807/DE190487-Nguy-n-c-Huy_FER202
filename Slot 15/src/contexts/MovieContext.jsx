import React, { createContext, useReducer, useContext, useEffect, useCallback, useState } from 'react';
import { movieReducer, initialMovieState } from '../reducers/movieReducers';
import movieApi from '../api/movieAPI';

export const MovieStateContext = createContext(initialMovieState);
export const MovieDispatchContext = createContext(null);

export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDispatch = () => useContext(MovieDispatchContext);

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const fetchMovies = useCallback(async () => {
    dispatch({ type: 'START_LOADING' });
    try {
      const response = await movieApi.get('/movies');
      dispatch({ type: 'SET_MOVIES', payload: response.data });
      setFilteredMovies(response.data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách phim:', error);
      dispatch({ type: 'SET_MOVIES', payload: [] });
      setFilteredMovies([]);
    }
  }, []);

  const fetchGenres = useCallback(async () => {
    try {
      const response = await movieApi.get('/genres');
      dispatch({ type: 'SET_GENRES', payload: response.data });
    } catch (error) {
      console.error('Lỗi khi tải danh sách thể loại:', error);
      dispatch({ type: 'SET_GENRES', payload: [] });
    }
  }, []);

  const confirmDelete = useCallback(async (id) => {
    dispatch({ type: 'CLOSE_DELETE_MODAL' });
    dispatch({ type: 'START_LOADING' });
    try {
      await movieApi.delete(`/movies/${id}`);
      fetchMovies();
    } catch (error) {
      console.error('Lỗi khi xóa phim:', error);
      fetchMovies();
    }
  }, [fetchMovies]);

  const handleCreateOrUpdate = useCallback(async (dataToSend, isEditing, isEditingId) => {
    dispatch({ type: 'START_LOADING' });
    try {
      if (isEditing) {
        await movieApi.put(`/movies/${isEditingId}`, dataToSend);
      } else {
        await movieApi.post('/movies', dataToSend);
      }
      dispatch({ type: 'RESET_FORM' });
      fetchMovies();
      return true;
    } catch (error) {
      console.error('Lỗi thao tác CREATE/UPDATE:', error);
      fetchMovies();
      return false;
    }
  }, [fetchMovies]);

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [fetchMovies, fetchGenres]);

  const dispatchValue = {
    dispatch,
    fetchMovies,
    fetchGenres,
    confirmDelete,
    handleCreateOrUpdate,
    filteredMovies,
    setFilteredMovies
  };

  const contextValue = {
    ...state,
    filteredMovies,
    setFilteredMovies
  };

  return (
    <MovieStateContext.Provider value={contextValue}>
      <MovieDispatchContext.Provider value={dispatchValue}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};
