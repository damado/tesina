"use strict";
/**
*	Configuración del contexto de la herramienta colaborativa.
*	Este archivo de configuración determina para cada uno de los procesos empleados en la herramienta cuantos usuarios pueden estar en linea para un determinado rol.
*	Será empleado para sincronizar los usuarios en cada proceso. Los procesos pueden tener mas de un rol y todos los campos son obligatorios.
**/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextConfiguration = {
    "activities": [
        {
            "name": "jugarpartidas",
            "roles": [
                {
                    "name": "blancas",
                    "usersOnlineNumberAllowed": 1
                },
                {
                    "name": "negras",
                    "usersOnlineNumberAllowed": 1
                }
            ]
        }
    ]
};
//# sourceMappingURL=config-collaborative-tool.js.map