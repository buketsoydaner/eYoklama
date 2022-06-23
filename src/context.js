import React, { Component } from "react";
import { loggedin1 } from "./Login";

export const UserContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_TEACHER":
      return {
        data: {
          ...state.data,
          teachers: state.data.teachers.filter(
            (teachers) => action.payload !== teachers.username
          ),
        },
      };""
    case "ADD_TEACHER":
      return {
        data: {
          ...state.data,
          teachers: [...state.data.teachers, action.payload],
        },
      };


    case "DELETE_LESSON":
      return {
        data: {
          ...state.data,
          teachers: state.data.teachers.map((teacher) => {
            return {
              ...teacher,
              dersler: teacher.dersler.filter(
                (ders) => action.payload !== ders.dersid
              ),
            };
          }),
        },
      };

    case "ADD_LESSON":
      const teacherIndex = state.data.teachers.findIndex(
        (teachers) => teachers.name == action.payload.teacher
      );
      state.data.teachers[teacherIndex].dersler = [
        action.payload.lesson,
        ...state.data.teachers[teacherIndex].dersler,
      ];
      return {
        data: {
          ...state.data,
          teachers: [...state.data.teachers],
        },
      };

    case "DELETE_STUDENT":
      return {
        data: {
          ...state.data,
          students: state.data.students.filter(
            (students) => action.payload !== students.username
          ),
          teachers: state.data.teachers.map((teacher) => {
            return {
              ...teacher,
              dersler: teacher.dersler.map((ders) => {
                return {
                  ...ders,
                  ogrencilistesi: ders.ogrencilistesi.filter(
                    (ogrencilistesi) =>
                      action.payload !== ogrencilistesi.username
                  ),
                };
              }),
            };
          }),
        },
      };

    case "ADD_STUDENT":
      return {
        data: {
          ...state.data,
          students: [...state.data.students, action.payload],
        },
      };
 

    case "ASSIGN_STUDENT":
      const foundStudent = state.data.students.find(
        (student) => student.username === action.payload.username
      );
      state.data.teachers.forEach((teacher) => {
        const foundLesson = teacher.dersler.find(
          (ders) => ders.dersid === action.payload.lessonId
        );
        if (foundLesson && foundStudent) {
          foundLesson.ogrencilistesi = [
            { username: action.payload.username, durum: "yok" },
            ...foundLesson.ogrencilistesi,
          ];
        }
      });

      return { data: { ...state.data } };

    case "UNASSIGN_STUDENT":
      state.data.teachers.forEach((teacher) => {
        const foundLesson = teacher.dersler.find(
          (ders) => ders.dersid === action.payload.lessonId
        );
        if (foundLesson) {
          const foundStudentIndex = foundLesson.ogrencilistesi.findIndex(
            (ogrenci) => ogrenci.username === action.payload.username
          );

          if (foundStudentIndex !== -1) {
            foundLesson.ogrencilistesi.splice(foundStudentIndex, 1);
          }
        }
      });
      return { data: { ...state.data } };

    case "STARTING_YOKLAMA":
      state.data.teachers.forEach((teacher) => {
        const foundLesson = teacher.dersler.find(
          (ders) => ders.dersid === action.payload.dersid
        );
        if (foundLesson) {
          foundLesson.yoklamakodu = action.payload.yoklamakodu;
        }
      });

      return { data: { ...state.data } };
    case "FINISHING_YOKLAMA":
      state.data.teachers.forEach((teacher) => {
        const foundLesson = teacher.dersler.find(
          (ders) => ders.yoklamakodu === action.payload.yoklamakodu
        );
        if (foundLesson) {
          foundLesson.ogrencilistesi.forEach(
            (ogrenci) => (ogrenci.durum = "yok")
          );
          foundLesson.yoklamakodu = "";
        }
      });
      return { data: { ...state.data } };

    case "SUBMIT_YOKLAMA":
      state.data.teachers.forEach((teacher) => {
        const foundLesson = teacher.dersler.find(
          (ders) => ders.yoklamakodu === action.payload.inputCode
        );
        if (foundLesson) {
          const foundStudent = foundLesson.ogrencilistesi.find(
            (ogrenci) => ogrenci.username === action.payload.studentid
          );

          if (foundStudent) {
            foundStudent.durum = "var";
          }
        }
      });
      return { data: { ...state.data } };

    default:
      return state;
  }
};

export class UserProvider extends Component {
  state = {
    data: {
      yonetici: [
        {
          userid: "0",
          name: "yonetici",
          username: "yonetici",
          password: "1234",
          usertype: "yonetici",
        },
      ],
      students: [
        {
          ogrenciadi: "Buket Soydaner",
          username: "1181602022",
          password: "1234",
          usertype: "student",
        },
        {
          ogrenciadi: "Hilal Bıyık",
          username: "1181602042",
          password: "1234",
          usertype: "student",
        },
        {
          ogrenciadi: "Sena Koçak",
          username: "1181602009",
          password: "1234",
          usertype: "student",
        },
        {
          ogrenciadi: "İlayda Giriş",
          username: "1181602019",
          password: "1234",
          usertype: "student",
        },
        {
          ogrenciadi: "Aylin Özcan",
          username: "1181602044",
          password: "1234",
          usertype: "student",
        },
        {
          ogrenciadi: "Ezgi Baydemir",
          username: "1181602021",
          password: "1234",
          usertype: "student",
        },
       
      ],

      teachers: [
        {
          name: "Dr.Öğr.Üyesi Aydın Carus",
          username: "aydın",
          password: "1234",
          usertype: "teacher",
          dersler: [
            {
              dersid: "1",
              yoklamakodu: "",
              dersadi: "YAZILIM MÜHENDİSLİĞİ",
              bolumadi: "Bilgisayar Mühendisliği",
              donem:"Güz",
              yil: "2021-2022",
              sinif: "4",
              ogrencilistesi: [
                {
                  username: "1181602022",
                  durum: "yok",
                },
                {
                  username: "1181602042",
                  durum: "yok",
                },
                {
                  username: "1181602019",
                  durum: "yok",
                },
                {
                  username: "1181602021",
                  durum: "yok",
                },
                {
                  username: "1181602009",
                  durum: "yok",
                },
             
              ],
            },
            {
              dersid: "2",
              yoklamakodu: "",
              dersadi: "C İLE PROGRAMLAMA",
              bolumadi: "Bilgisayar Mühendisliği",
              donem:"Bahar",
              yil: "2021-2022",
              sinif: "2",
              ogrencilistesi: [
                {
                  username: "1181602022",
                  durum: "yok",
                },
                {
                  username: "1181602042",
                  durum: "yok",
                },
                {
                  username: "1181602019",
                  durum: "yok",
                },
                {
                  username: "1181602021",
                  durum: "yok",
                },
                {
                  username: "1181602009",
                  durum: "yok",
                },
              ],
            },
          ],
        },
        {
          name: "Dr.Öğr.Üyesi Altan Mesut",
          username: "altan",
          password: "1234",
          usertype: "teacher",
          dersler: [
            {
              dersid: "3",
              yoklamakodu: "",
              dersadi: "VERİ TABANI YÖNETİMİ",
              bolumadi: "Bilgisayar Mühendisliği",
              donem:"Güz",
              yil: "2021-2022",
              sinif: "4",
              ogrencilistesi: [
                {
                  username: "1181602022",
                  durum: "yok",
                },
                {
                  username: "1181602042",
                  durum: "yok",
                },
                {
                  username: "1181602019",
                  durum: "yok",
                },
                {
                  username: "1191602021",
                  durum: "yok",
                },
                
              ],
            },
            {
              dersid: "4",
              yoklamakodu: "",
              dersadi: "BİLGİSAYAR MÜHENDİLİĞİNE GİRİŞ",
              bolumadi: "Bilgisayar Mühendisliği",
              donem:"Güz",
              yil: "2021-2022",
              sinif: "1",
              ogrencilistesi: [
                {
                  username: "1181602022",
                  durum: "yok",
                },
                {
                  username: "1181602042",
                  durum: "yok",
                },
                {
                  username: "1181602021",
                  durum: "yok",
                },
                {
                  username: "1181602019",
                  durum: "yok",
                },
                {
                  username: "1181602009",
                  durum: "yok",
                },
              ],
            },
          ],
        },
        {
          name: "Dr.Öğr.Üyesi CEM TAŞKIN",
          username: "cem",
          password: "1234",
          usertype: "teacher",
          dersler: [
            {
              dersid: "5",
              yoklamakodu: "",
              dersadi: "WEB TABANLI PROGRAMLAMA",
              bolumadi: "Bilgisayar Mühendisliği",
              donem:"Bahar",
              yil: "2021-2022",
              sinif: "4",
              ogrencilistesi: [
                {
                  username: "1181602022",
                  durum: "yok",
                },
                {
                  username: "1181602021",
                  durum: "yok",
                },
                {
                  username: "1181602042",
                  durum: "yok",
                },
                {
                  username: "1181602009",
                  durum: "yok",
                },
                {
                  username: "1181602019",
                  durum: "yok",
                },
              ],
            },
            {
              dersid: "6",
              yoklamakodu: "",
              dersadi: "MOBİL UYGULAMA GELİŞTİRME 1",
              bolumadi: "Bilgisayar Mühendisliği",
              donem:"Bahar",
              yil: "2021-2022",
              sinif: "4",
              ogrencilistesi: [
                {
                  username: "1181602022",
                  durum: "yok",
                },
                {
                  username: "1181602044",
                  durum: "yok",
                },
                {
                  username: "1181602042",
                  durum: "yok",
                },
                {
                  username: "1181602021",
                  durum: "yok",
                },              
              ],
            },
          ],
        },
      ],
    },
    dispatch: (action) => {
      this.setState((state) => reducer(state, action));
    },
  };

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
const UserConsumer = UserContext.Consumer;
export default UserConsumer;
