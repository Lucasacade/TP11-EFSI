import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import {
  useForm,
  Controller,
} from "react-hook-form";

import AsyncStorage from
  "@react-native-async-storage/async-storage";

import CampoFormulario from
  "../components/CampoFormulario";

import TicketConfirmacion from
  "../components/TicketConfirmacion";


export function InscripcionScreen() {

  const [
    inscripcionConfirmada,
    setInscripcionConfirmada,
  ] = useState(null);

  const [cargando, setCargando] =
    useState(false);

  const [emailAnterior, setEmailAnterior] =
    useState("");


  const {
    control,
    handleSubmit,
    reset,
    formState: {
      errors,
      isValid,
    },
  } = useForm({

    mode: "onChange",

    defaultValues: {
      nombreCompleto: "",
      email: "",
      edad: "",
      tipoEntrada: "",
      telefono: "",
      genero: "",
    },

  });


  useEffect(() => {
    cargarEmailAnterior();
  }, []);


  const cargarEmailAnterior = async () => {

    try {

      const email =
        await AsyncStorage.getItem(
          "ultimoEmail"
        );

      if (email) {

        setEmailAnterior(email);

        reset({
          nombreCompleto: "",
          email: email,
          edad: "",
          tipoEntrada: "",
          telefono: "",
          genero: "",
        });

      }

    } catch (error) {

      console.log(
        "No se pudo cargar el email"
      );

    }

  };


  const confirmarInscripcion =
    async (data) => {

      setCargando(true);


      await new Promise(
        (resolve) =>
          setTimeout(resolve, 1000)
      );


      try {

        await AsyncStorage.setItem(
          "ultimoEmail",
          data.email
        );

      } catch (error) {

        console.log(
          "No se pudo guardar el email"
        );

      }


      const codigo =
        "SS-" +
        Math.floor(
          100000 + Math.random() * 900000
        );


      const datosFinales = {
        ...data,
        codigo: codigo,
      };


      setCargando(false);

      setInscripcionConfirmada(
        datosFinales
      );

    };


  const volverAInscribir = () => {

    setInscripcionConfirmada(null);

    reset({
      nombreCompleto: "",
      email: emailAnterior,
      edad: "",
      tipoEntrada: "",
      telefono: "",
      genero: "",
    });

  };


  if (inscripcionConfirmada) {

    return (

      <TicketConfirmacion
        datos={inscripcionConfirmada}
        onNuevaInscripcion={
          volverAInscribir
        }
      />

    );

  }


  return (

    <KeyboardAvoidingView

      style={styles.container}

      behavior={
        Platform.OS === "ios"
          ? "padding"
          : "height"
      }

    >

      <ScrollView

        contentContainerStyle={
          styles.scroll
        }

        keyboardShouldPersistTaps="handled"

      >


        {/* HEADER */}

        <View style={styles.header}>

          <Text style={styles.logo}>
            SONIDO SUR
          </Text>

          <Text style={styles.headerSubtitulo}>
            FESTIVAL DE MÚSICA
          </Text>

          <Text style={styles.headerDescripcion}>
            Música, amigos y una experiencia
            para recordar.
          </Text>

        </View>


        {/* INFORMACIÓN DEL EVENTO */}

        <View style={styles.eventoCard}>

          <Text style={styles.eventoTitulo}>
            🎶 PRÓXIMO EVENTO
          </Text>

          <View style={styles.eventoFila}>

            <Text style={styles.eventoIcono}>
              📅
            </Text>

            <View>
              <Text style={styles.eventoLabel}>
                FECHA
              </Text>

              <Text style={styles.eventoTexto}>
                Sábado 14 de noviembre
              </Text>
            </View>

          </View>


          <View style={styles.eventoFila}>

            <Text style={styles.eventoIcono}>
              📍
            </Text>

            <View>
              <Text style={styles.eventoLabel}>
                LUGAR
              </Text>

              <Text style={styles.eventoTexto}>
                Ciudad Universitaria
              </Text>
            </View>

          </View>


          <View style={styles.eventoFila}>

            <Text style={styles.eventoIcono}>
              🕒
            </Text>

            <View>
              <Text style={styles.eventoLabel}>
                HORARIO
              </Text>

              <Text style={styles.eventoTexto}>
                16:00 a 00:00 hs
              </Text>
            </View>

          </View>

        </View>


        {/* TITULO FORMULARIO */}

        <View style={styles.seccion}>

          <Text style={styles.seccionNumero}>
            01
          </Text>

          <View>

            <Text style={styles.seccionTitulo}>
              Tus datos
            </Text>

            <Text style={styles.seccionDescripcion}>
              Completá la información para
              reservar tu lugar.
            </Text>

          </View>

        </View>


        {/* NOMBRE */}

        <Controller

          control={control}

          name="nombreCompleto"

          rules={{

            required:
              "Ingresá tu nombre completo",

            minLength: {
              value: 3,
              message:
                "Ingresá tu nombre completo",
            },

            validate: (value) =>
              value.trim().length >= 3 ||
              "Ingresá tu nombre completo",

          }}

          render={({
            field: {
              onChange,
              value,
            },
          }) => (

            <CampoFormulario

              label="Nombre completo"

              value={value}

              onChangeText={onChange}

              placeholder="Ej: Lucas Dorin"

              error={
                errors
                  .nombreCompleto
                  ?.message
              }

            />

          )}

        />


        {/* EMAIL */}

        <Controller

          control={control}

          name="email"

          rules={{

            required:
              "Ingresá un email válido",

            pattern: {

              value:
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

              message:
                "Ingresá un email válido",

            },

          }}

          render={({
            field: {
              onChange,
              value,
            },
          }) => (

            <CampoFormulario

              label="Email"

              value={value}

              onChangeText={onChange}

              placeholder="Ej: lucas@gmail.com"

              keyboardType="email-address"

              error={
                errors
                  .email
                  ?.message
              }

            />

          )}

        />


        {/* EDAD */}

        <Controller

          control={control}

          name="edad"

          rules={{

            required:
              "La edad tiene que ser mayor a 12",

            validate: (value) => {

              const edad =
                Number(value);

              if (
                !Number.isInteger(
                  edad
                ) ||
                edad < 12 ||
                edad > 99
              ) {

                return (
                  "La edad tiene que ser mayor a 12"
                );

              }

              return true;

            },

          }}

          render={({
            field: {
              onChange,
              value,
            },
          }) => (

            <CampoFormulario

              label="Edad"

              value={value}

              onChangeText={onChange}

              placeholder="Ej: 17"

              keyboardType="numeric"

              error={
                errors
                  .edad
                  ?.message
              }

            />

          )}

        />


        {/* TELEFONO */}

        <Controller

          control={control}

          name="telefono"

          rules={{

            validate: (value) => {

              if (!value) {
                return true;
              }

              return (
                /^[0-9]+$/.test(
                  value
                ) ||
                "Solo se permiten números"
              );

            },

          }}

          render={({
            field: {
              onChange,
              value,
            },
          }) => (

            <CampoFormulario

              label="Teléfono (opcional)"

              value={value}

              onChangeText={onChange}

              placeholder="Ej: 1123456789"

              keyboardType="phone-pad"

              error={
                errors
                  .telefono
                  ?.message
              }

            />

          )}

        />


        {/* SECCIÓN PREFERENCIAS */}

        <View style={styles.seccion}>

          <Text style={styles.seccionNumero}>
            02
          </Text>

          <View>

            <Text style={styles.seccionTitulo}>
              Elegí tu experiencia
            </Text>

            <Text style={styles.seccionDescripcion}>
              Seleccioná tu entrada y género
              favorito.
            </Text>

          </View>

        </View>


        {/* TIPO DE ENTRADA */}

        <Controller

          control={control}

          name="tipoEntrada"

          rules={{
            required:
              "Elegí un tipo de entrada",
          }}

          render={({
            field: {
              value,
              onChange,
            },
          }) => (

            <View
              style={styles.campo}
            >

              <Text style={styles.label}>
                Tipo de entrada
              </Text>

              <View
                style={styles.opciones}
              >


                {/* GENERAL */}

                <TouchableOpacity

                  style={[
                    styles.entrada,

                    value === "general" &&
                      styles.entradaSeleccionada,
                  ]}

                  onPress={() =>
                    onChange("general")
                  }

                >

                  <Text
                    style={
                      styles.entradaIcono
                    }
                  >
                    🎫
                  </Text>

                  <Text
                    style={
                      styles.entradaTitulo
                    }
                  >
                    GENERAL
                  </Text>

                  <Text
                    style={
                      styles.entradaPrecio
                    }
                  >
                    $20.000
                  </Text>

                  <Text
                    style={
                      styles.entradaDescripcion
                    }
                  >
                    Acceso al festival
                  </Text>

                </TouchableOpacity>


                {/* VIP */}

                <TouchableOpacity

                  style={[
                    styles.entrada,

                    value === "vip" &&
                      styles.entradaSeleccionada,
                  ]}

                  onPress={() =>
                    onChange("vip")
                  }

                >

                  <Text
                    style={
                      styles.entradaIcono
                    }
                  >
                    ⭐
                  </Text>

                  <Text
                    style={
                      styles.entradaTitulo
                    }
                  >
                    VIP
                  </Text>

                  <Text
                    style={
                      styles.entradaPrecio
                    }
                  >
                    $35.000
                  </Text>

                  <Text
                    style={
                      styles.entradaDescripcion
                    }
                  >
                    Acceso + sector VIP
                  </Text>

                </TouchableOpacity>

              </View>


              {errors.tipoEntrada && (

                <Text
                  style={styles.error}
                >
                  {
                    errors
                      .tipoEntrada
                      .message
                  }
                </Text>

              )}

            </View>

          )}

        />


        {/* GENERO */}

        <Controller

          control={control}

          name="genero"

          rules={{
            required:
              "Elegí tu género favorito",
          }}

          render={({
            field: {
              value,
              onChange,
            },
          }) => (

            <View
              style={styles.campo}
            >

              <Text style={styles.label}>
                Género favorito
              </Text>

              <View
                style={
                  styles.generos
                }
              >

                {[
                  "Rock",
                  "Pop",
                  "Electrónica",
                  "Reggaetón",
                ].map((genero) => (

                  <TouchableOpacity

                    key={genero}

                    style={[
                      styles.genero,

                      value === genero &&
                        styles.generoSeleccionado,
                    ]}

                    onPress={() =>
                      onChange(genero)
                    }

                  >

                    <Text
                      style={[
                        styles.generoTexto,

                        value === genero &&
                          styles.generoTextoSeleccionado,
                      ]}
                    >
                      {genero}
                    </Text>

                  </TouchableOpacity>

                ))}

              </View>


              {errors.genero && (

                <Text
                  style={styles.error}
                >
                  {
                    errors
                      .genero
                      .message
                  }
                </Text>

              )}

            </View>

          )}

        />


        {/* RESUMEN */}

        <View
          style={styles.resumen}
        >

          <Text
            style={styles.resumenTitulo}
          >
            🎟️ RESERVÁ TU LUGAR
          </Text>

          <Text
            style={styles.resumenTexto}
          >
            Revisá tus datos antes de confirmar
            la inscripción.
          </Text>

        </View>


        {/* BOTÓN */}

        <TouchableOpacity

          style={[
            styles.boton,

            (!isValid || cargando) &&
              styles.botonDeshabilitado,
          ]}

          disabled={
            !isValid || cargando
          }

          onPress={
            handleSubmit(
              confirmarInscripcion
            )
          }

        >

          {cargando ? (

            <View
              style={styles.loading}
            >

              <ActivityIndicator
                color="#fff"
              />

              <Text
                style={styles.botonTexto}
              >
                Procesando inscripción...
              </Text>

            </View>

          ) : (

            <Text
              style={styles.botonTexto}
            >
              Confirmar inscripción →
            </Text>

          )}

        </TouchableOpacity>


        <Text
          style={styles.privacidad}
        >
          Tus datos se utilizan solamente para
          gestionar tu inscripción.
        </Text>


      </ScrollView>

    </KeyboardAvoidingView>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f1f7",
  },


  scroll: {
    padding: 20,
    paddingBottom: 50,
  },


  header: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 25,
  },


  logo: {
    fontSize: 38,
    fontWeight: "900",
    color: "#721c8c",
    letterSpacing: 1,
  },


  headerSubtitulo: {
    fontSize: 12,
    letterSpacing: 4,
    fontWeight: "700",
    color: "#777",
    marginTop: 2,
  },


  headerDescripcion: {
    textAlign: "center",
    color: "#777",
    marginTop: 12,
    fontSize: 14,
  },


  eventoCard: {
    backgroundColor: "#721c8c",
    borderRadius: 18,
    padding: 20,
    marginBottom: 30,
    elevation: 4,
  },


  eventoTitulo: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 15,
  },


  eventoFila: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },


  eventoIcono: {
    fontSize: 22,
    marginRight: 12,
  },


  eventoLabel: {
    color: "#d9b7e3",
    fontSize: 10,
    fontWeight: "800",
  },


  eventoTexto: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },


  seccion: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 5,
  },


  seccionNumero: {
    backgroundColor: "#721c8c",
    color: "#fff",
    width: 38,
    height: 38,
    borderRadius: 20,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "900",
    marginRight: 12,
  },


  seccionTitulo: {
    fontSize: 20,
    fontWeight: "900",
    color: "#29232f",
  },


  seccionDescripcion: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },


  campo: {
    marginBottom: 20,
  },


  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#29232f",
    marginBottom: 9,
  },


  opciones: {
    flexDirection: "row",
    gap: 12,
  },


  entrada: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#e2e2e2",
    borderRadius: 15,
    padding: 16,
    minHeight: 150,
  },


  entradaSeleccionada: {
    borderColor: "#721c8c",
    backgroundColor: "#f7eff9",
  },


  entradaIcono: {
    fontSize: 25,
    marginBottom: 8,
  },


  entradaTitulo: {
    fontSize: 16,
    fontWeight: "900",
    color: "#29232f",
  },


  entradaPrecio: {
    fontSize: 18,
    fontWeight: "900",
    color: "#721c8c",
    marginTop: 5,
  },


  entradaDescripcion: {
    color: "#777",
    fontSize: 12,
    marginTop: 5,
  },


  generos: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
  },


  genero: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 17,
  },


  generoSeleccionado: {
    backgroundColor: "#721c8c",
    borderColor: "#721c8c",
  },


  generoTexto: {
    color: "#444",
    fontWeight: "600",
  },


  generoTextoSeleccionado: {
    color: "#fff",
  },


  error: {
    color: "#d93636",
    fontSize: 13,
    marginTop: 6,
  },


  resumen: {
    backgroundColor: "#ebe1ef",
    padding: 18,
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 15,
  },


  resumenTitulo: {
    color: "#721c8c",
    fontSize: 16,
    fontWeight: "900",
  },


  resumenTexto: {
    color: "#666",
    marginTop: 5,
    fontSize: 13,
  },


  boton: {
    backgroundColor: "#721c8c",
    borderRadius: 14,
    padding: 17,
    marginTop: 5,
  },


  botonDeshabilitado: {
    backgroundColor: "#aaa",
  },


  botonTexto: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "900",
  },


  loading: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },


  privacidad: {
    textAlign: "center",
    color: "#999",
    fontSize: 11,
    marginTop: 12,
  },

});