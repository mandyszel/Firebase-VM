import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },

  buttonContainer: {
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },

  button: {
    backgroundColor: "#7d9ac9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
  buttonOutline: {
    backgroundColor: "white",
    borderColor: "#7d9ac9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#7d9ac9",
  },

  //FLATLIST
  item: {
    backgroundColor: "white",
    borderColor: "#7d9ac9",
    borderWidth: 2,
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
  },
  titulo: {
    fontSize: 18,
    color: "#7d9ac9",
    fontWeight: "500",
  },
  imagem: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },
  imagemView: {
    alignContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  imagemListar: {
    width: 120,
    height: 120,
    borderRadius: 80,
    borderColor: "#7d9ac9",
    borderWidth: 3,
    marginLeft: 20,
    marginBottom: 10,
  },
});
