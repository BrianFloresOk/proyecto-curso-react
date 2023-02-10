import React from "react";

export const Task = () => {
  return (
    <div >
      <div>
        <p >Tarea</p>
        <p>Descripción</p>
        <p >Fecha de entrega</p>
        <p>Prioridad</p>
      </div>
      <div>
        <button>
          Editar
        </button>

        {false ? (
          <button>
            Completa
          </button>
        ) : (
          <button >
            Incompleta
          </button>
        )}

        <button>
          Eliminar
        </button>
      </div>
    </div>
  );
};