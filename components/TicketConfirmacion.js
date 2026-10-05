import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function TicketConfirmacion({
  datos,
  onNuevaInscripcion,
}) {
  const precio =
    datos.tipoEntrada === "vip"
      ? "$35.000"
      : "$20.000";

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.logo}>SONIDO SUR</Text>

        <Text style={styles.headerText}>
          FESTIVAL DE MÚSICA
        </Text>
      </View>

      <View style={styles.ticket}>

        <View style={styles.confirmacion}>
          <Text style={styles.check}>✓</Text>

          <Text style={styles.confirmado}>
            INSCRIPCIÓN CONFIRMADA
          </Text>

          <Text style={styles.gracias}>
            ¡Ya tenés tu lugar en Sonido Sur!
          </Text>
        </View>

        <View style={styles.separador} />

        <Text style={styles.ticketTitle}>
          🎫 TU ENTRADA
        </Text>

        <View style={styles.codigoContainer}>
          <Text style={styles.codigoLabel}>
            CÓDIGO DE ENTRADA
          </Text>

          <Text style={styles.codigo}>
            {datos.codigo}
          </Text>
        </View>

        <View style={styles.datosContainer}>

          <Text style={styles.label}>
            Nombre completo
          </Text>

          <Text style={styles.dato}>
            {datos.nombreCompleto}
          </Text>


          <Text style={styles.label}>
            Email
          </Text>

          <Text style={styles.dato}>
            {datos.email}
          </Text>


          <Text style={styles.label}>
            Edad
          </Text>

          <Text style={styles.dato}>
            {datos.edad} años
          </Text>


          <Text style={styles.label}>
            Teléfono
          </Text>

          <Text style={styles.dato}>
            {datos.telefono
              ? datos.telefono
              : "No informado"}
          </Text>


          <Text style={styles.label}>
            Género favorito
          </Text>

          <Text style={styles.dato}>
            {datos.genero}
          </Text>

        </View>

        <View style={styles.separador} />

        <View style={styles.evento}>

          <Text style={styles.eventoTitulo}>
            INFORMACIÓN DEL EVENTO
          </Text>

          <Text style={styles.eventoDato}>
            📅 Sábado 14 de noviembre
          </Text>

          <Text style={styles.eventoDato}>
            📍 Ciudad Universitaria, Buenos Aires
          </Text>

          <Text style={styles.eventoDato}>
            🕒 16:00 a 00:00 hs
          </Text>

        </View>

        <View style={styles.precioContainer}>

          <Text style={styles.precioLabel}>
            Tipo de entrada
          </Text>

          <Text style={styles.tipo}>
            {datos.tipoEntrada === "vip"
              ? "VIP ⭐"
              : "GENERAL"}
          </Text>

          <Text style={styles.precio}>
            {precio}
          </Text>

        </View>

        <View style={styles.separador} />

        <Text style={styles.mensaje}>
          Presentá este ticket al ingresar al festival.
        </Text>

        <TouchableOpacity
          style={styles.boton}
          onPress={onNuevaInscripcion}
        >
          <Text style={styles.botonTexto}>
            Volver a inscribir a otra persona
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f2edf5",
    padding: 20,
  },

  header: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },

  logo: {
    fontSize: 34,
    fontWeight: "900",
    color: "#721c8c",
  },

  headerText: {
    fontSize: 13,
    letterSpacing: 3,
    color: "#777",
    marginTop: 3,
  },

  ticket: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 22,
    elevation: 6,
  },

  confirmacion: {
    alignItems: "center",
  },

  check: {
    backgroundColor: "#721c8c",
    color: "#fff",
    width: 55,
    height: 55,
    borderRadius: 30,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 32,
    fontWeight: "bold",
  },

  confirmado: {
    fontSize: 20,
    fontWeight: "900",
    color: "#27222d",
    marginTop: 12,
    textAlign: "center",
  },

  gracias: {
    color: "#777",
    marginTop: 5,
    textAlign: "center",
  },

  separador: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    marginVertical: 20,
  },

  ticketTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#721c8c",
    marginBottom: 15,
  },

  codigoContainer: {
    backgroundColor: "#f4eef7",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 18,
  },

  codigoLabel: {
    fontSize: 11,
    color: "#777",
    letterSpacing: 1,
  },

  codigo: {
    fontSize: 23,
    fontWeight: "900",
    color: "#721c8c",
    marginTop: 5,
    letterSpacing: 2,
  },

  datosContainer: {
    marginTop: 5,
  },

  label: {
    fontSize: 12,
    color: "#888",
    marginTop: 10,
  },

  dato: {
    fontSize: 16,
    fontWeight: "700",
    color: "#29242f",
    marginTop: 2,
  },

  evento: {
    backgroundColor: "#faf7fb",
    padding: 15,
    borderRadius: 12,
  },

  eventoTitulo: {
    fontWeight: "900",
    color: "#721c8c",
    marginBottom: 10,
  },

  eventoDato: {
    fontSize: 14,
    color: "#444",
    marginBottom: 7,
  },

  precioContainer: {
    marginTop: 20,
    alignItems: "center",
  },

  precioLabel: {
    color: "#888",
    fontSize: 13,
  },

  tipo: {
    fontSize: 17,
    fontWeight: "800",
    marginTop: 3,
  },

  precio: {
    fontSize: 28,
    fontWeight: "900",
    color: "#721c8c",
    marginTop: 5,
  },

  mensaje: {
    textAlign: "center",
    color: "#777",
    fontSize: 13,
    marginBottom: 18,
  },

  boton: {
    backgroundColor: "#721c8c",
    padding: 16,
    borderRadius: 12,
  },

  botonTexto: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
  },
});