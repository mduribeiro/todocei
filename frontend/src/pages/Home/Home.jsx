import React, { useEffect, useState } from "react"; // Importa React y los hooks useEffect y useState
import Navbar from "../../components/Navbar/Navbar"; // Importa el componente Navbar
import NoteCard from "../../components/Cards/NoteCard"; // Importa el componente NoteCard
import { MdAdd } from "react-icons/md"; // Importa el ícono de añadir
import Modal from "react-modal"; // Importa el componente Modal
import AddEditNotes from "./AddEditNotes"; // Importa el componente AddEditNotes
import Toast from "../../components/ToastMessage/Toast"; // Importa el componente Toast
import axiosInstance from "../../utils/axiosInstance"; // Importa la instancia de Axios
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la navegación
import AddNotesImg from "../../assets/images/add-notes.svg"; // Imagen para añadir notas
import NoDataImg from "../../assets/images/no-data.svg"; // Imagen para cuando no hay datos
import EmptyCard from "../../components/EmptyCard/EmptyCard"; // Importa el componente EmptyCard

// Componente principal de la página de inicio
const Home = () => {
  // Estados para manejar los datos de las notas y la búsqueda
  const [allNotes, setAllNotes] = useState([]); // Estado para todas las notas
  const [isSearch, setIsSearch] = useState(false); // Estado para manejar la búsqueda
  const [userInfo, setUserInfo] = useState(null); // Estado para la información del usuario

  // Hook para la navegación
  const navigate = useNavigate();

  // Estado para manejar el modal de agregar/editar notas
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  // Estado para manejar el mensaje de tostada
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  // Función para abrir el modal de edición
  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  // Función para mostrar un mensaje de tostada
  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message: message,
      type,
    });
  };

  // Función para cerrar el mensaje de tostada
  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  // Función para obtener todas las notas
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again."); // Manejo de errores
    }
  };

  // Función para eliminar una nota
  const deleteNote = async (data) => {
    const noteId = data._id; // Obtiene el ID de la nota
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete"); // Muestra mensaje de éxito
        getAllNotes(); // Actualiza la lista de notas
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again."); // Manejo de errores
    }
  };

  // Función para obtener la información del usuario
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user); // Actualiza la información del usuario
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear(); // Limpia el almacenamiento local en caso de error 401
        navigate("/login"); // Redirige al usuario a la página de login
      }
    }
  };

  // Función para buscar una nota
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true); // Marca que se está en modo de búsqueda
        setAllNotes(response.data.notes); // Actualiza las notas con los resultados de búsqueda
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again."); // Manejo de errores
    }
  };

  // Función para actualizar el estado de fijación de una nota
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id; // Obtiene el ID de la nota

    try {
      const response = await axiosInstance.put(
        "/update-note-pinned/" + noteId,
        {
          isPinned: !noteData.isPinned, // Alterna el estado de fijación
        }
      );

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully", "update"); // Muestra mensaje de éxito
        getAllNotes(); // Actualiza la lista de notas
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again."); // Manejo de errores
    }
  };

  // Función para limpiar la búsqueda y volver a obtener todas las notas
  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  // Hook useEffect para obtener las notas y la información del usuario al montar el componente
  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {}; // Cleanup function (vacía en este caso)
  }, []);

  return (
    <>
      {/* Componente de la barra de navegación */}
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto">
        {isSearch && (
          <h3 className="text-lg font-medium mt-5">Search Results</h3> // Muestra encabezado si está en modo búsqueda
        )}

        {allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                content={item.content}
                date={item.createdOn}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)} // Llama a la función de edición
                onDelete={() => deleteNote(item)} // Llama a la función de eliminación
                onPinNote={() => updateIsPinned(item)} // Llama a la función de fijación
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoDataImg : AddNotesImg} // Imagen basada en si está en búsqueda o no
            message={
              isSearch
                ? `Oops! No notes found matching your search.` // Mensaje cuando no se encuentran notas en búsqueda
                : `Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas, and reminders. Let's get started!` // Mensaje para crear una nota
            }
          />
        )}
      </div>

      {/* Botón para añadir una nueva nota */}
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-pink-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" /> {/* Ícono de añadir */}
      </button>

      {/* Modal para agregar o editar notas */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel="Example Modal"
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          showToastMessage={showToastMessage}
          getAllNotes={getAllNotes}
        />
      </Modal>

      {/* Componente de mensaje de tostada */}
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home; // Exporta el componente Home


