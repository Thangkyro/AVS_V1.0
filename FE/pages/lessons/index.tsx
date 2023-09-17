import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { setPageTitle } from '../../store/themeConfigSlice';

const convertLink = (url: string) => {
    const parsedURL = new URL(url);
    return parsedURL.origin + parsedURL.pathname + '...';
};

const Lessons = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Lessons'));
    });

    const rowData = [
        {
            id: 1,
            subject: 'Agrimony',
            class: 'Q',
            date: '10/13/2023',
            resource:
                'https://accuweather.com/mauris/lacinia.jsp?fusce=congue&congue=eget&diam=semper&id=rutrum&ornare=nulla&imperdiet=nunc&sapien=purus&urna=phasellus&pretium=in&nisl=felis&ut=donec&volutpat=semper&sapien=sapien&arcu=a&sed=libero&augue=nam&aliquam=dui&erat=proin&volutpat=leo&in=odio&congue=porttitor&etiam=id&justo=consequat&etiam=in&pretium=consequat&iaculis=ut&justo=nulla&in=sed&hac=accumsan&habitasse=felis&platea=ut&dictumst=at&etiam=dolor&faucibus=quis&cursus=odio&urna=consequat&ut=varius&tellus=integer&nulla=ac&ut=leo&erat=pellentesque&id=ultrices&mauris=mattis&vulputate=odio&elementum=donec&nullam=vitae&varius=nisi&nulla=nam&facilisi=ultrices&cras=libero&non=non&velit=mattis&nec=pulvinar&nisi=nulla&vulputate=pede&nonummy=ullamcorper&maecenas=augue&tincidunt=a&lacus=suscipit&at=nulla&velit=elit&vivamus=ac&vel=nulla&nulla=sed&eget=vel&eros=enim&elementum=sit&pellentesque=amet&quisque=nunc&porta=viverra&volutpat=dapibus&erat=nulla&quisque=suscipit&erat=ligula&eros=in',
            content:
                'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
        },
        {
            id: 2,
            subject: 'PredniSONE',
            class: 'H',
            date: '04/02/2023',
            resource:
                'https://delicious.com/magnis/dis/parturient/montes/nascetur.jsp?imperdiet=vel&nullam=augue&orci=vestibulum&pede=ante&venenatis=ipsum&non=primis&sodales=in&sed=faucibus&tincidunt=orci&eu=luctus&felis=et&fusce=ultrices&posuere=posuere&felis=cubilia&sed=curae&lacus=donec&morbi=pharetra&sem=magna&mauris=vestibulum',
            content:
                'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
        },
        {
            id: 3,
            subject: 'Famotidine',
            class: 'J',
            date: '10/18/2023',
            resource:
                'http://xinhuanet.com/eu/est/congue.png?metus=nulla&sapien=tempus&ut=vivamus&nunc=in&vestibulum=felis&ante=eu&ipsum=sapien&primis=cursus&in=vestibulum&faucibus=proin&orci=eu&luctus=mi&et=nulla&ultrices=ac&posuere=enim&cubilia=in&curae=tempor&mauris=turpis&viverra=nec&diam=euismod&vitae=scelerisque&quam=quam&suspendisse=turpis&potenti=adipiscing&nullam=lorem&porttitor=vitae&lacus=mattis&at=nibh&turpis=ligula&donec=nec&posuere=sem&metus=duis&vitae=aliquam&ipsum=convallis&aliquam=nunc&non=proin&mauris=at&morbi=turpis&non=a',
            content:
                'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
        },
        {
            id: 4,
            subject: 'Stemphylium spp',
            class: 'M',
            date: '04/21/2023',
            resource:
                'http://gizmodo.com/amet/nulla/quisque/arcu/libero/rutrum.html?diam=pellentesque&in=viverra&magna=pede&bibendum=ac&imperdiet=diam&nullam=cras&orci=pellentesque&pede=volutpat&venenatis=dui&non=maecenas&sodales=tristique&sed=est&tincidunt=et&eu=tempus&felis=semper&fusce=est&posuere=quam&felis=pharetra&sed=magna&lacus=ac&morbi=consequat&sem=metus&mauris=sapien&laoreet=ut&ut=nunc&rhoncus=vestibulum&aliquet=ante&pulvinar=ipsum&sed=primis&nisl=in&nunc=faucibus&rhoncus=orci&dui=luctus&vel=et&sem=ultrices&sed=posuere&sagittis=cubilia&nam=curae&congue=mauris&risus=viverra&semper=diam&porta=vitae&volutpat=quam&quam=suspendisse&pede=potenti&lobortis=nullam&ligula=porttitor&sit=lacus&amet=at&eleifend=turpis&pede=donec&libero=posuere&quis=metus&orci=vitae',
            content:
                'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
        },
        {
            id: 5,
            subject: 'Calcium polycarbophil',
            class: 'N',
            date: '05/22/2023',
            resource:
                'https://umn.edu/duis/at/velit/eu/est/congue.xml?magna=mauris&vestibulum=eget&aliquet=massa&ultrices=tempor&erat=convallis&tortor=nulla&sollicitudin=neque&mi=libero&sit=convallis&amet=eget&lobortis=eleifend&sapien=luctus&sapien=ultricies&non=eu&mi=nibh&integer=quisque&ac=id&neque=justo&duis=sit&bibendum=amet&morbi=sapien&non=dignissim&quam=vestibulum&nec=vestibulum&dui=ante&luctus=ipsum&rutrum=primis&nulla=in&tellus=faucibus&in=orci&sagittis=luctus&dui=et&vel=ultrices&nisl=posuere&duis=cubilia&ac=curae&nibh=nulla&fusce=dapibus&lacus=dolor&purus=vel&aliquet=est&at=donec&feugiat=odio&non=justo&pretium=sollicitudin&quis=ut&lectus=suscipit&suspendisse=a&potenti=feugiat&in=et&eleifend=eros&quam=vestibulum&a=ac&odio=est&in=lacinia&hac=nisi&habitasse=venenatis&platea=tristique&dictumst=fusce&maecenas=congue&ut=diam&massa=id&quis=ornare&augue=imperdiet&luctus=sapien&tincidunt=urna&nulla=pretium&mollis=nisl&molestie=ut&lorem=volutpat&quisque=sapien&ut=arcu&erat=sed&curabitur=augue&gravida=aliquam',
            content:
                'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
        },
        {
            id: 6,
            subject: 'TITANIUM DIOXIDE',
            class: 'J',
            date: '05/23/2023',
            resource:
                'http://un.org/dui/vel/sem/sed/sagittis/nam/congue.jpg?laoreet=placerat&ut=praesent&rhoncus=blandit&aliquet=nam&pulvinar=nulla&sed=integer&nisl=pede&nunc=justo&rhoncus=lacinia&dui=eget&vel=tincidunt&sem=eget&sed=tempus&sagittis=vel&nam=pede&congue=morbi&risus=porttitor&semper=lorem&porta=id&volutpat=ligula&quam=suspendisse&pede=ornare&lobortis=consequat&ligula=lectus&sit=in&amet=est&eleifend=risus&pede=auctor&libero=sed&quis=tristique&orci=in&nullam=tempus&molestie=sit&nibh=amet&in=sem&lectus=fusce&pellentesque=consequat&at=nulla&nulla=nisl&suspendisse=nunc&potenti=nisl&cras=duis&in=bibendum&purus=felis&eu=sed&magna=interdum&vulputate=venenatis&luctus=turpis&cum=enim&sociis=blandit&natoque=mi&penatibus=in&et=porttitor&magnis=pede&dis=justo&parturient=eu&montes=massa&nascetur=donec&ridiculus=dapibus&mus=duis&vivamus=at&vestibulum=velit&sagittis=eu&sapien=est&cum=congue&sociis=elementum&natoque=in&penatibus=hac&et=habitasse',
            content: 'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
        },
        {
            id: 7,
            subject: 'rivastigmine',
            class: 'Q',
            date: '06/23/2023',
            resource:
                'http://linkedin.com/porta/volutpat/quam.jsp?donec=quam&diam=pede&neque=lobortis&vestibulum=ligula&eget=sit&vulputate=amet&ut=eleifend&ultrices=pede&vel=libero&augue=quis&vestibulum=orci&ante=nullam&ipsum=molestie&primis=nibh&in=in&faucibus=lectus&orci=pellentesque&luctus=at&et=nulla&ultrices=suspendisse&posuere=potenti&cubilia=cras&curae=in&donec=purus&pharetra=eu&magna=magna&vestibulum=vulputate&aliquet=luctus&ultrices=cum&erat=sociis&tortor=natoque&sollicitudin=penatibus&mi=et&sit=magnis&amet=dis&lobortis=parturient&sapien=montes&sapien=nascetur&non=ridiculus&mi=mus&integer=vivamus&ac=vestibulum&neque=sagittis&duis=sapien&bibendum=cum&morbi=sociis&non=natoque&quam=penatibus&nec=et&dui=magnis&luctus=dis&rutrum=parturient&nulla=montes&tellus=nascetur&in=ridiculus&sagittis=mus&dui=etiam&vel=vel&nisl=augue&duis=vestibulum&ac=rutrum&nibh=rutrum&fusce=neque&lacus=aenean&purus=auctor&aliquet=gravida&at=sem',
            content:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
        },
        {
            id: 8,
            subject: 'diflorasone diacetate',
            class: 'L',
            date: '04/05/2023',
            resource:
                'http://berkeley.edu/curabitur.html?sapien=maecenas&cum=pulvinar&sociis=lobortis&natoque=est&penatibus=phasellus&et=sit&magnis=amet&dis=erat&parturient=nulla&montes=tempus&nascetur=vivamus&ridiculus=in&mus=felis&etiam=eu&vel=sapien&augue=cursus&vestibulum=vestibulum&rutrum=proin&rutrum=eu&neque=mi&aenean=nulla&auctor=ac&gravida=enim&sem=in&praesent=tempor&id=turpis&massa=nec',
            content: 'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
        },
        {
            id: 9,
            subject: 'Acetaminophen, Chlorpheniramine Maleate and Phenylephrine HCl',
            class: 'X',
            date: '06/02/2023',
            resource: 'https://bloglines.com/orci/mauris/lacinia/sapien.jpg?congue=nullam&eget=varius&semper=nulla&rutrum=facilisi&nulla=cras',
            content:
                'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
        },
        {
            id: 10,
            subject: 'Acetaminophen',
            class: 'V',
            date: '01/16/2023',
            resource:
                'https://redcross.org/sapien/urna/pretium/nisl/ut/volutpat.js?justo=enim&morbi=lorem&ut=ipsum&odio=dolor&cras=sit&mi=amet&pede=consectetuer&malesuada=adipiscing&in=elit&imperdiet=proin&et=interdum&commodo=mauris&vulputate=non&justo=ligula&in=pellentesque&blandit=ultrices&ultrices=phasellus&enim=id&lorem=sapien&ipsum=in&dolor=sapien&sit=iaculis&amet=congue&consectetuer=vivamus&adipiscing=metus&elit=arcu&proin=adipiscing&interdum=molestie&mauris=hendrerit&non=at&ligula=vulputate&pellentesque=vitae&ultrices=nisl&phasellus=aenean&id=lectus&sapien=pellentesque&in=eget&sapien=nunc&iaculis=donec&congue=quis&vivamus=orci&metus=eget&arcu=orci&adipiscing=vehicula&molestie=condimentum&hendrerit=curabitur&at=in&vulputate=libero&vitae=ut&nisl=massa&aenean=volutpat&lectus=convallis&pellentesque=morbi&eget=odio&nunc=odio&donec=elementum&quis=eu&orci=interdum&eget=eu&orci=tincidunt&vehicula=in&condimentum=leo&curabitur=maecenas&in=pulvinar&libero=lobortis&ut=est&massa=phasellus&volutpat=sit&convallis=amet&morbi=erat&odio=nulla&odio=tempus&elementum=vivamus&eu=in&interdum=felis&eu=eu&tincidunt=sapien&in=cursus&leo=vestibulum&maecenas=proin&pulvinar=eu&lobortis=mi&est=nulla&phasellus=ac&sit=enim&amet=in&erat=tempor&nulla=turpis&tempus=nec',
            content:
                'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
        },
        {
            id: 11,
            subject: 'Carboplatin',
            class: 'K',
            date: '07/20/2023',
            resource:
                'http://exblog.jp/est/donec/odio/justo/sollicitudin.jpg?eu=pretium&massa=quis&donec=lectus&dapibus=suspendisse&duis=potenti&at=in&velit=eleifend&eu=quam&est=a&congue=odio&elementum=in&in=hac&hac=habitasse&habitasse=platea&platea=dictumst&dictumst=maecenas&morbi=ut&vestibulum=massa&velit=quis&id=augue&pretium=luctus&iaculis=tincidunt&diam=nulla&erat=mollis&fermentum=molestie&justo=lorem&nec=quisque&condimentum=ut&neque=erat&sapien=curabitur&placerat=gravida&ante=nisi&nulla=at&justo=nibh&aliquam=in&quis=hac&turpis=habitasse&eget=platea&elit=dictumst&sodales=aliquam',
            content:
                'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
        },
        {
            id: 12,
            subject: 'Metronidazole',
            class: 'O',
            date: '08/21/2023',
            resource: 'https://dailymail.co.uk/non/interdum.xml?a=in&libero=hac',
            content:
                'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
        },
        {
            id: 13,
            subject: 'OCTINOXATE, OXYBENZONE',
            class: 'I',
            date: '10/15/2023',
            resource:
                'http://twitter.com/justo/maecenas/rhoncus/aliquam/lacus/morbi.xml?praesent=neque&blandit=libero&lacinia=convallis&erat=eget&vestibulum=eleifend&sed=luctus&magna=ultricies&at=eu&nunc=nibh&commodo=quisque',
            content: 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
        },
        {
            id: 14,
            subject: 'leucovorin calcium',
            class: 'N',
            date: '03/24/2023',
            resource: 'http://aboutads.info/nullam/orci/pede/venenatis/non/sodales.png?volutpat=mauris&convallis=ullamcorper&morbi=purus&odio=sit&odio=amet&elementum=nulla&eu=quisque',
            content:
                'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        },
        {
            id: 15,
            subject: 'Paroxetine Hydrochloride',
            class: 'D',
            date: '04/20/2023',
            resource:
                'https://wordpress.org/adipiscing/lorem/vitae/mattis/nibh/ligula.json?vestibulum=cubilia&sed=curae&magna=nulla&at=dapibus&nunc=dolor&commodo=vel&placerat=est&praesent=donec&blandit=odio&nam=justo&nulla=sollicitudin&integer=ut&pede=suscipit&justo=a&lacinia=feugiat&eget=et&tincidunt=eros&eget=vestibulum&tempus=ac&vel=est&pede=lacinia&morbi=nisi&porttitor=venenatis&lorem=tristique&id=fusce&ligula=congue&suspendisse=diam&ornare=id&consequat=ornare&lectus=imperdiet&in=sapien&est=urna&risus=pretium&auctor=nisl&sed=ut&tristique=volutpat&in=sapien&tempus=arcu&sit=sed&amet=augue&sem=aliquam&fusce=erat&consequat=volutpat&nulla=in&nisl=congue&nunc=etiam&nisl=justo&duis=etiam&bibendum=pretium&felis=iaculis',
            content:
                'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
        },
        {
            id: 16,
            subject: 'pantoprazole sodium',
            class: 'U',
            date: '04/14/2023',
            resource:
                'http://edublogs.org/cum/sociis/natoque.jpg?sapien=in&a=lacus&libero=curabitur&nam=at&dui=ipsum&proin=ac&leo=tellus&odio=semper&porttitor=interdum&id=mauris&consequat=ullamcorper&in=purus&consequat=sit&ut=amet&nulla=nulla&sed=quisque&accumsan=arcu&felis=libero&ut=rutrum&at=ac&dolor=lobortis&quis=vel&odio=dapibus&consequat=at&varius=diam&integer=nam&ac=tristique',
            content:
                'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
        },
        {
            id: 17,
            subject: 'Monobasic Sodium Phosphate and Dibasic Sodium Phosphate',
            class: 'D',
            date: '10/26/2023',
            resource:
                'https://slate.com/metus/vitae.js?nulla=purus&dapibus=aliquet&dolor=at&vel=feugiat&est=non&donec=pretium&odio=quis&justo=lectus&sollicitudin=suspendisse&ut=potenti&suscipit=in&a=eleifend&feugiat=quam&et=a&eros=odio&vestibulum=in&ac=hac&est=habitasse&lacinia=platea&nisi=dictumst&venenatis=maecenas&tristique=ut&fusce=massa&congue=quis&diam=augue&id=luctus&ornare=tincidunt&imperdiet=nulla&sapien=mollis&urna=molestie&pretium=lorem&nisl=quisque&ut=ut&volutpat=erat',
            content:
                'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
        },
        {
            id: 18,
            subject: 'Metyrapone',
            class: 'D',
            date: '04/23/2023',
            resource: 'http://slashdot.org/amet.png?eget=vel&orci=nisl&vehicula=duis&condimentum=ac&curabitur=nibh',
            content:
                'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
        },
        {
            id: 19,
            subject: 'ATORVASTATIN CALCIUM',
            class: 'I',
            date: '09/09/2023',
            resource:
                'http://virginia.edu/etiam/vel.aspx?consectetuer=curae&adipiscing=nulla&elit=dapibus&proin=dolor&interdum=vel&mauris=est&non=donec&ligula=odio&pellentesque=justo&ultrices=sollicitudin&phasellus=ut&id=suscipit&sapien=a&in=feugiat&sapien=et&iaculis=eros&congue=vestibulum&vivamus=ac&metus=est&arcu=lacinia&adipiscing=nisi&molestie=venenatis&hendrerit=tristique&at=fusce&vulputate=congue&vitae=diam&nisl=id&aenean=ornare&lectus=imperdiet&pellentesque=sapien&eget=urna&nunc=pretium&donec=nisl&quis=ut&orci=volutpat&eget=sapien&orci=arcu&vehicula=sed&condimentum=augue&curabitur=aliquam&in=erat&libero=volutpat&ut=in&massa=congue&volutpat=etiam&convallis=justo&morbi=etiam&odio=pretium&odio=iaculis&elementum=justo&eu=in&interdum=hac&eu=habitasse&tincidunt=platea&in=dictumst&leo=etiam&maecenas=faucibus&pulvinar=cursus&lobortis=urna&est=ut&phasellus=tellus&sit=nulla&amet=ut',
            content:
                'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
        },
        {
            id: 20,
            subject: 'Allopurinol',
            class: 'Q',
            date: '09/12/2023',
            resource:
                'http://deliciousdays.com/dolor/quis/odio/consequat/varius/integer.js?sit=adipiscing&amet=elit&justo=proin&morbi=interdum&ut=mauris&odio=non&cras=ligula&mi=pellentesque&pede=ultrices&malesuada=phasellus&in=id&imperdiet=sapien&et=in&commodo=sapien&vulputate=iaculis&justo=congue&in=vivamus&blandit=metus&ultrices=arcu&enim=adipiscing&lorem=molestie&ipsum=hendrerit&dolor=at&sit=vulputate&amet=vitae&consectetuer=nisl&adipiscing=aenean&elit=lectus&proin=pellentesque&interdum=eget&mauris=nunc&non=donec&ligula=quis&pellentesque=orci&ultrices=eget&phasellus=orci&id=vehicula&sapien=condimentum&in=curabitur&sapien=in&iaculis=libero&congue=ut&vivamus=massa&metus=volutpat&arcu=convallis&adipiscing=morbi&molestie=odio&hendrerit=odio&at=elementum&vulputate=eu&vitae=interdum&nisl=eu&aenean=tincidunt&lectus=in&pellentesque=leo&eget=maecenas&nunc=pulvinar&donec=lobortis&quis=est&orci=phasellus&eget=sit&orci=amet&vehicula=erat&condimentum=nulla&curabitur=tempus&in=vivamus&libero=in&ut=felis&massa=eu',
            content:
                'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
        },
        {
            id: 21,
            subject: 'Treatment Set TS338910',
            class: 'U',
            date: '05/19/2023',
            resource:
                'http://wufoo.com/quis/justo/maecenas.jpg?bibendum=nibh&morbi=quisque&non=id&quam=justo&nec=sit&dui=amet&luctus=sapien&rutrum=dignissim&nulla=vestibulum&tellus=vestibulum&in=ante&sagittis=ipsum&dui=primis&vel=in&nisl=faucibus&duis=orci&ac=luctus&nibh=et&fusce=ultrices&lacus=posuere&purus=cubilia&aliquet=curae&at=nulla&feugiat=dapibus&non=dolor&pretium=vel&quis=est&lectus=donec&suspendisse=odio&potenti=justo&in=sollicitudin&eleifend=ut&quam=suscipit&a=a&odio=feugiat&in=et&hac=eros&habitasse=vestibulum&platea=ac&dictumst=est&maecenas=lacinia&ut=nisi&massa=venenatis&quis=tristique&augue=fusce&luctus=congue&tincidunt=diam&nulla=id&mollis=ornare&molestie=imperdiet&lorem=sapien&quisque=urna&ut=pretium&erat=nisl&curabitur=ut&gravida=volutpat&nisi=sapien&at=arcu&nibh=sed&in=augue&hac=aliquam&habitasse=erat&platea=volutpat&dictumst=in&aliquam=congue&augue=etiam&quam=justo&sollicitudin=etiam&vitae=pretium&consectetuer=iaculis&eget=justo&rutrum=in&at=hac&lorem=habitasse&integer=platea&tincidunt=dictumst&ante=etiam&vel=faucibus&ipsum=cursus&praesent=urna&blandit=ut&lacinia=tellus&erat=nulla&vestibulum=ut&sed=erat&magna=id&at=mauris&nunc=vulputate&commodo=elementum&placerat=nullam&praesent=varius&blandit=nulla&nam=facilisi&nulla=cras',
            content:
                'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
        },
        {
            id: 22,
            subject: 'tizanidine hydrochloride',
            class: 'P',
            date: '06/11/2023',
            resource:
                'https://census.gov/nullam/sit/amet/turpis/elementum/ligula.json?lorem=non&id=mauris&ligula=morbi&suspendisse=non&ornare=lectus&consequat=aliquam&lectus=sit&in=amet&est=diam&risus=in&auctor=magna&sed=bibendum&tristique=imperdiet&in=nullam&tempus=orci&sit=pede&amet=venenatis&sem=non&fusce=sodales&consequat=sed&nulla=tincidunt&nisl=eu&nunc=felis&nisl=fusce&duis=posuere&bibendum=felis&felis=sed&sed=lacus&interdum=morbi&venenatis=sem&turpis=mauris',
            content:
                'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
        },
        {
            id: 23,
            subject: 'RANITIDINE',
            class: 'Y',
            date: '12/06/2023',
            resource:
                'https://linkedin.com/leo/rhoncus/sed.html?nisl=id&aenean=turpis&lectus=integer&pellentesque=aliquet&eget=massa&nunc=id&donec=lobortis&quis=convallis&orci=tortor&eget=risus&orci=dapibus&vehicula=augue&condimentum=vel&curabitur=accumsan&in=tellus&libero=nisi&ut=eu&massa=orci&volutpat=mauris&convallis=lacinia&morbi=sapien&odio=quis&odio=libero&elementum=nullam&eu=sit&interdum=amet&eu=turpis&tincidunt=elementum&in=ligula&leo=vehicula&maecenas=consequat&pulvinar=morbi&lobortis=a&est=ipsum&phasellus=integer&sit=a&amet=nibh&erat=in&nulla=quis&tempus=justo&vivamus=maecenas&in=rhoncus&felis=aliquam&eu=lacus&sapien=morbi',
            content:
                'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
        },
        {
            id: 24,
            subject: 'Menthol',
            class: 'O',
            date: '03/22/2023',
            resource:
                'https://guardian.co.uk/eu/sapien/cursus/vestibulum/proin/eu.aspx?elit=eu&proin=orci&risus=mauris&praesent=lacinia&lectus=sapien&vestibulum=quis&quam=libero&sapien=nullam&varius=sit&ut=amet&blandit=turpis&non=elementum&interdum=ligula&in=vehicula&ante=consequat&vestibulum=morbi&ante=a&ipsum=ipsum&primis=integer&in=a&faucibus=nibh&orci=in&luctus=quis&et=justo&ultrices=maecenas&posuere=rhoncus&cubilia=aliquam&curae=lacus&duis=morbi&faucibus=quis&accumsan=tortor&odio=id&curabitur=nulla&convallis=ultrices&duis=aliquet&consequat=maecenas&dui=leo&nec=odio&nisi=condimentum&volutpat=id&eleifend=luctus&donec=nec&ut=molestie&dolor=sed&morbi=justo&vel=pellentesque&lectus=viverra&in=pede&quam=ac&fringilla=diam&rhoncus=cras&mauris=pellentesque&enim=volutpat&leo=dui&rhoncus=maecenas&sed=tristique&vestibulum=est&sit=et&amet=tempus&cursus=semper&id=est&turpis=quam&integer=pharetra&aliquet=magna&massa=ac&id=consequat&lobortis=metus&convallis=sapien&tortor=ut&risus=nunc&dapibus=vestibulum&augue=ante&vel=ipsum&accumsan=primis&tellus=in&nisi=faucibus&eu=orci&orci=luctus&mauris=et&lacinia=ultrices&sapien=posuere&quis=cubilia&libero=curae&nullam=mauris&sit=viverra&amet=diam&turpis=vitae&elementum=quam&ligula=suspendisse&vehicula=potenti&consequat=nullam&morbi=porttitor&a=lacus&ipsum=at',
            content:
                'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
        },
        {
            id: 25,
            subject: 'Russian Thistle',
            class: 'E',
            date: '05/29/2023',
            resource:
                'http://4shared.com/praesent/id/massa/id/nisl.js?sit=praesent&amet=lectus&erat=vestibulum&nulla=quam&tempus=sapien&vivamus=varius&in=ut&felis=blandit&eu=non&sapien=interdum&cursus=in&vestibulum=ante&proin=vestibulum&eu=ante&mi=ipsum&nulla=primis&ac=in&enim=faucibus&in=orci&tempor=luctus&turpis=et&nec=ultrices&euismod=posuere&scelerisque=cubilia&quam=curae&turpis=duis&adipiscing=faucibus&lorem=accumsan&vitae=odio&mattis=curabitur&nibh=convallis&ligula=duis&nec=consequat&sem=dui&duis=nec&aliquam=nisi&convallis=volutpat&nunc=eleifend&proin=donec&at=ut&turpis=dolor&a=morbi&pede=vel&posuere=lectus&nonummy=in&integer=quam&non=fringilla&velit=rhoncus&donec=mauris&diam=enim&neque=leo&vestibulum=rhoncus&eget=sed&vulputate=vestibulum&ut=sit&ultrices=amet&vel=cursus&augue=id&vestibulum=turpis&ante=integer&ipsum=aliquet&primis=massa&in=id&faucibus=lobortis&orci=convallis&luctus=tortor&et=risus',
            content:
                'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
        },
    ];

    const [search, setSearch] = useState(false);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    const onRowClick = (row: any) => {
        if (selectedRow === row.id) {
            setSelectedRow(null);
        } else {
            setSelectedRow(row.id);
        }
    };

    return (
        <div className="panel">
            <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <h5 className="text-lg font-semibold dark:text-white-light">All Lessons</h5>
                <div className="flex items-center">
                    <Link href="/" className="btn btn-primary btn-sm">
                        <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <use href="/assets/images/icons/icons.svg#lineDuotoneEssentionalUIAddSquare" stroke="currentColor" />
                            </svg>
                            <span className="pl-2">Add more lesson</span>
                        </>
                    </Link>
                </div>
            </div>
            <form
                className={`${search && '!block'} absolute inset-x-0 top-1/2 z-10 mx-4 hidden -translate-y-1/2 sm:relative sm:top-0 sm:mx-0 sm:block sm:translate-y-0`}
                onSubmit={() => setSearch(false)}
            >
                <div className="relative mb-5 max-w-lg">
                    <input
                        type="text"
                        className="peer form-input bg-gray-100 placeholder:tracking-widest ltr:pl-9 ltr:pr-9 rtl:pl-9 rtl:pr-9 sm:bg-transparent ltr:sm:pr-4 rtl:sm:pl-4"
                        placeholder="Search by #Name, #Class, #Email"
                    />
                    <button type="button" className="absolute inset-0 h-9 w-9 appearance-none peer-focus:text-primary ltr:right-auto rtl:left-auto">
                        <svg className="mx-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <use href="/assets/images/icons/icons.svg#lineDuotoneSearchMagnifer" stroke="currentColor" />
                        </svg>
                    </button>
                </div>
            </form>
            <div className="datatables">
                {isMounted && (
                    <DataTable
                        noRecordsText="No results match your search query"
                        highlightOnHover
                        className="table-hover whitespace-nowrap"
                        records={recordsData}
                        columns={[
                            {
                                accessor: 'id',
                                title: 'ID',
                                sortable: false,
                                render: ({ id }) => (
                                    <div className="flex items-center">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`transition-all duration-200 ${selectedRow === id ? 'rotate-90' : ''}`}
                                        >
                                            <use href="/assets/images/icons/icons.svg#lineDuotoneArrowsAltArrowRight" stroke="currentColor" />
                                        </svg>

                                        <strong className="pl-2 text-info">#{id}</strong>
                                    </div>
                                ),
                            },
                            {
                                accessor: 'subject',
                                title: 'Subject Name',
                                sortable: true,
                            },
                            {
                                accessor: 'class',
                                title: 'Class',
                                render: ({ class: classroom }) => <span className="uppercase">{classroom}</span>,
                            },
                            {
                                accessor: 'date',
                                title: 'Date',
                            },
                        ]}
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                        rowExpansion={{
                            content: ({ record }) => (
                                <span>
                                    Resource:{' '}
                                    <Link href={record.resource} className="text-primary hover:underline" target="_blank">
                                        {convertLink(record.resource)}
                                    </Link>
                                </span>
                            ),
                        }}
                        onRowClick={(record) => onRowClick(record)}
                    />
                )}
            </div>
        </div>
    );
};

export default Lessons;
