import {populateSpeedReader, generateFileName} from './populate-speed-reader'
import { IS_WALLABY } from 'lib/constants'

test('happy', async() => {
  if(IS_WALLABY) return
  await populateSpeedReader()
})
 
test('generate file name', () => {
  const files = [
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/Ajn_Rand_-_Romanticheski_manifest_-8881-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/Aleksandyr_Girginov_-_Smjah_i_mydrost_prez_vekovete_-8679-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/Anton_Pavlovich_Chehov_-_Damata_s_kuchentseto_-685-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/Bob_Fenstyr_-_Bezkrajnostta_na_choveshkata_prostotija_-5996-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/Bob_Fenstyr_-_Oshte_prostotii_-8385-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/Bogomil_Gerasimov_-_Ot_Abyrdijn_s_usmivka_-_Shotlandski_humor-6108-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/Fridrih_Nitsshe_-_Ecce_Homo_-_Kak_se_stava_takyv_kakyvto_si-1881-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/Fxodor_Dostoevski_-_Beli_noshti_-_Santimentalen_roman-6578-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/Henri_Milyr_-_Nexus_-8084-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/Lao_Dzy_-_Dao_dy_dzin_-7620-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/Lao_Dzy_-_Pytjat_-8232-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/Lev_Tolstoj_-_Otets_Sergij_-9303-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/Lev_Tolstoj_-_Vojna_i_mir_-_Treti_i_chetvyrti_tom-4404-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/Lev_Tolstoj_-_Vyzkresenie_-4777-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/Nikolaj_Gogol_-_Peterburgski_povesti_-137-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/Nikolaj_Gogol_-_Povesti_-681-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/Nikolaj_Gogol_-_Vecheri_v_seltseto_kraj_Dikanka_-136-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/P._G._Udhaus_-_Bankeri_po_nevolja_-6223-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/P._G._Udhaus_-_Bil_Zavoevatelja_-2411-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/P._G._Udhaus_-_Chicho_Fred_prez_proletta_-5403-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/P._G._Udhaus_-_Dzhijvs_zapretva_rykavi_-5129-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/P._G._Udhaus_-_Dzhim_Tajfuna_-2525-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/P._G._Udhaus_-_Gafovete_na_Archi_-2554-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/P._G._Udhaus_-_Galahad_v_Blandings_-2629-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/P._G._Udhaus_-_Goljamoto_nakisvane_-1413-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/P._G._Udhaus_-_Ikonom_za_edin_den_-2375-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/P._G._Udhaus_-_Klub_Anonimni_ergeni_-3091-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/P._G._Udhaus_-_Kukovo_ljato_v_Blandings_-2330-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/P._G._Udhaus_-_Pelikan_v_Blandings_-2372-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/P._G._Udhaus_-_Skrito-pokrito_-2104-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/P._G._Udhaus_-_Zakonyt_na_Ustyr_-4347-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/Temida_se_sheguva_-_Anekdoti_i_neverojatni_istorii_ot_praktikata_na_juristite-5182-b.txt.zip',
    '/home/s/repos/on/lambdas/populate-speed-reader/assets/Volter_-_Filosofski_noveli_-656-b.txt.zip'
  ]

  expect(
    files.map(generateFileName)
  ).toMatchSnapshot()
})