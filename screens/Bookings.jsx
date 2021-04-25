import React from 'react'
import { connect } from 'react-redux'
import { Block, Text } from './../components/index';
import { TouchableOpacity } from 'react-native';

const Bookings = (props) => {

    const temp = () => {
        let areas = `

<td>Sukh Chain Society
<td>Bahria Town
<td>EME DHA Society

<td>PASCO Housing Society
<td>Eden Canal Villas
<td>Eden Homes

<td>Fransisi Town
<td>Doctors Society
<td>Thokar Niaz Baig

<td>Sarshar Town
<td>Awan Town
<td>Canal Breeze

<td>Allama Iqbal Town
<td>Saidpur
<td>Sabzazar

<td>Samanabad
<td>Ichhra
<td>Wahdat Colony

<td>Gulshan E Ravi
<td>Riwaz Garden
<td>Band Road

<td>Sanda Khurd
<td>Sanda Kalan
<td>Islam Pura

<td>Sanat Nagar
<td>Bilal Gang
<td>Amin Park

<td>Karim Park
<td>Ravi Road
<td>Data Nagar

<td>Shad Bagh
<td>Usman Ganj
<td>Misri Shah

<td>Faruque Ganj
<td>Badami Bagh
<td>Darbar Gurreh Shah

<td>Baghban Pura
<td>Star Town
<td>Wapda Colony

<td>Shalimar Town
<td>Khudad Town
<td>Mahmood Booty Ring Road

<td>Herbuns Pura
<td>Shalimar Link Road
<td>Ghousia Colony

<td>Ram Garh
<td>Mughal Pura
<td>Nabi Pura

<td>Ittehad Colony
<td>Samia Town
<td>Muslima Bad

<td>Ali Park
<td>Guldasit Colony
<td>New PAF Colony

<td>Officers Colony
<td>Mustafa Bad
<td>Fortress Stadium

<td>Burj Colony
<td>Canal Road
<td>Canal View Colony

<td>Suparco Colony
<td>Engineer Cooperative Society
<td>Tech Society

<td>PCSIR Housing Scheme
<td>PCSIR Housing Society
<td>Alpha Co Operative

<td>Punjab University
<td>Jinnah Hospital
<td>Allama Iqbal Medical College

<td>Punjab University Hostel
<td>New Garden Town
<td>Muslim Town

<td>Shadman Colony
<td>Fc College
<td>Shah Jamal

<td>Johar Town
<td>PIA Society
<td>Revenue Society

<td>Airline Society
<td>Shama Colony
<td>Peco Road

<td>Faisal Town
<td>Model Town
<td>New Mustafa Colony

<td>Wafaqi Colony
<td>Township
<td>Kot Lakhpat

<td>Bostan Colony
<td>Baba Farid Colony
<td>Race Course Town

<td>Hamdard Chowk
<td>Green Town
<td>PCSIR Society

<td>Bagrian
<td>Punjab Govt Employs Coparative Society
<td>Raiwind Road

<td>Lake City
<td>Lalzar Colony
<td>West Wood Colony

<td>Shabir Town
<td>Main Khayaban Road
<td>Opf Colony

<td>Opf Housing Scheme
<td>Nasheman Iqbal Housing Scheme
<td>Tariq Garden

<td>NFC Town
<td>Wapda Town
<td>Khyaban E Amin

<td>Nespak Society
<td>Anar Kali
<td>Mall Road

<td>Aitchison Society
<td>Davis Road
<td>Garhi Shahu

<td>Railway Housing Society
<td>Dharampura
<td>Mayo Hospital

<td>Gawal Mandi
<td>Lakshmi Chowk
<td>Punjab University Old Campus

<td>Qila Gujarsing
<td>Wapda House
<td>Jail Road

<td>Mazang
<td>Ganga Ram Hospital
<td>Race Course Park Surrounding Area

<td>Gor
<td>Gulberg 1
<td>Gulberg 2

<td>Gulberg 3
<td>Firozpur Road
<td>Askari Colony

<td>Gulbahar Colony
<td>Madina Colony
<td>Walton Road

<td>Ghazi Road
<td>Chungi Amer Sadhu
<td>Awan Market

<td>Nishtar Colony
<td>Youhna Bad
<td>Abdalian Housing Society

<td>Bedian Road
<td>Alfalah Town
<td>Chararrd Village

<td>Cavalry Ground
<td>Super Town
<td>Rehman Garden

<td>Punjab Society Near Dha
<td>Sui Gas Society
<td>State Life Society

<td>DHA 1
<td>DHA 2
<td>DHA 3

<td>DHA 4
<td>DHA 5
<td>DHA 6

<td>DHA 7
<td>DHA 8
<td>Lidhar

<td>Chachowali
<td>Gohawa
<td>Airport Road

<td>Cantt
<td>Askrai Villa 1
<td>Askrai Villa 2

<td>Askrai Villa 3
<td>Askrai Villa 4
<td>Askrai Villa 5

<td>Askrai Villa 6
<td>Askrai Villa 7
<td>Askrai Villa 8

<td>Askrai Villa 9
<td>Askrai Villa 10
<td>Askrai Villa

<td>Army Housing Society
<td>Eden Avenue
<td>Eden View

<td>Barki Road
<td>Paragon City
<td>LUMS

<td>Rang Mehal
<td>Architects Engineers Society
<td>Civic Center

<td>Gor I
<td>Gor II
<td>Gor III

<td>Gor IV
<td>Gor V
<td>Tariq Block

<td>Aurangzeb Block
<td>Aibak Block
<td>Babar Block

<td>Tipu Block
<td>Shersha Block
<td>Atta Turk Block

<td>Usman Block
<td>Ali Block
<td>Garden Block

<td>Abu Bakar Block
<td>Ahmed Block
<td>Iqbal Ave Housing Society

<td>Gulberg 5
<td>Gulberg 4
<td>Ferozpur Road

<td>CMA Colony
<td>Saint John Park
<td>Saddar

<td>Main Mir Colony
<td>Upper Mall Scheme
<td>Temple Road

<td>Quaid e Azam Industrial Estate
<td>Kainchi
<td>K B Society

<td>Salamatpura
<td>Sarwar Road
<td>Taj Bagh

<td>Taj Para
<td>Moon Market
<td>Nizam Block

<td>Shaikh Zayed Hospital
<td>Gulshan Block
<td>Shaukat Khanum Hospital

<td>UCP
<td>Muhafiz Town
<td>LDA Avenue

<td>Canal Garden
<td>Tricon Valley
<td>Jubli Town

<td>Izmir Town
<td>Iqbal Avenue
<td>Canal Bank

<td>Canal Park Society
<td>Main Gulberg Boulevard
<td>Falcon Complex

<td>M M Alam Road
<td>Asif Block
<td>Multan Road

<td>Badar Block
<td>Chenab Block
<td>College Block

<td>Education Town
<td>Huma Block
<td>Hunza Block

<td>Jehanzeb Block
<td>Kamran Block
<td>Karim Block

<td>Khyber Block
<td>Mamdoot Block
<td>Maraghzar Colony

<td>Mehran Block
<td>Mustafa Town
<td>Nargis Block

<td>Neelam Block
<td>Nishtar Block
<td>Pak Block

<td>Ravi Block
<td>Rachna Block
<td>Raza Block

<td>Sutlej Block
<td>Sikandar Block
<td>Umer Block

<td>Zeenat Block
<td>Makkah Colony
<td>Khuda Buksh Colony

<td>Fort Villas
<td>Bridge Colony
<td>Lahore Gym Khana

<td>Infantry Road
<td>Khursheed Alam Road
<td>Nisar Colony

<td>Tufail Road
<td>Lawrence Road
<td>Nasheman Colony

<td>Munir Road
<td>R A Bazaar
<td>Shahtaj Colony

<td>Zaman Colony
<td>LDA Colony
<td>University of Lahore

<td>Valencia Town Block A1
<td>Valencia Town Block A2
<td>Valencia Town Block A3

<td>Valencia Town Block C
<td>Valencia Town Block F
<td>Valencia Town Block G

<td>Valencia Town Block H
<td>Valencia Town Block H1
<td>Valencia Town Block J

<td>Valencia Town Block K1
<td>Valencia Town Block L
<td>Valencia Town Block P1
`

let arr = areas.split("<td>")
console.log(arr)
    }
    return (
        <Block center middle>
<TouchableOpacity onPress={()=>temp()}>
            <Text>Bookings</Text>
        </TouchableOpacity>
        </Block>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookings)
