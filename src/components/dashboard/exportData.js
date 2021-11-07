import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { TicketService } from '../../services/TicketService';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

export class DataTableExportDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tickets: [],
            events: [],
            paterner:[],
            selectedTickets: [],
            importedCols: [{ field: '', header: 'Header' }],
            globalFilter: "",
            selectedEvent: null,
            sum:0,
        };


        this.exportCSV = this.exportCSV.bind(this);
        this.exportPdf = this.exportPdf.bind(this);
        this.exportExcel = this.exportExcel.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);
        this.onEventChange = this.onEventChange.bind(this);

        this.ticketService = new TicketService();

        this.cols = [
            { field: 'index', header: 'No' },
            { field: 'fullName', header: 'Names' },
            { field: 'email', header: 'E-mail' },
            { field: 'phoneNumber', header: 'PhoneNumber' },
            { field: 'nationalId', header: 'National ID' },
            { field: 'price', header: 'Price' },
            { field: 'sittingPlace', header: 'Seat' },
            { field: 'status', header: 'status' },
            { field: 'type', header: 'Type' }
        ];

        this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
    }

    componentDidMount() {
        this.ticketService.getTicketsEvents({ token: this.props.token, id: this.props.id }).then(data => {
            this.setState({ events: data })
        });
    }


    exportCSV(selectionOnly) {
        this.dt.exportCSV({ selectionOnly });
    }

    exportPdf() {
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(this.exportColumns, this.state.tickets);
                doc.save('tickets.pdf');
            })
        })
    }

    exportExcel() {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.state.tickets);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, 'tickets');
        });
    }

    saveAsExcelFile(buffer, fileName) {
        import('file-saver').then(FileSaver => {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            let EXCEL_EXTENSION = '.xlsx';
            const data = new Blob([buffer], {
                type: EXCEL_TYPE
            });
            FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        });
    }

    toCapitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }



    onSelectionChange(e) {
        this.setState({ selectedTickets: e.value });
    }
    reset = () => {
        this.setState({ globalFilter: "" })
    }

    selectedEventTemplate(option, props) {
        if (option) {
            return (
                <div className="event-item flex gap-2 event-item-value">
                    <img alt={option.title} className="object-cover" height="10" width="10" src={option.image} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
                    <div>{option.title}</div>
                </div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }

    eventOptionTemplate(option) {
        return (
            <div className="event-item flex gap-2">
                <img alt={option.title} className="object-cover" height="10" width="20" src={option.image} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
                <div>{option.title}</div>
            </div>
        );
    }

    onEventChange(e) {
        this.setState({selectedEvent: e.value });
        this.ticketService.getTicketsSmall({ token: this.props.token, id: e.value.id }).then(data => {
            const {ticket,paterner} = data;
            this.setState({ tickets: ticket })
            this.setState({ paterner: paterner })
            let sum = _.sumBy(ticket,'price');
            this.setState({ sum})
        });
    }

    render() {
        const header = (
            <div>
                 <div>
                    <Dropdown className="w-full" value={this.state.selectedEvent} options={this.state.events} onChange={this.onEventChange} optionLabel="title" filter showClear filterBy="title" placeholder="Select an Event"
                        valueTemplate={this.selectedEventTemplate} itemTemplate={this.eventOptionTemplate} />
                </div>
                <div className="flex gap-2 justify-between">
                    <div className="p-d-flex p-ai-center export-buttons">
                        <Button type="button" icon="pi pi-file-o" onClick={() => this.exportCSV(false)} className="p-mr-2" data-pr-tooltip="CSV" />
                        <Button type="button" icon="pi pi-file-excel" onClick={this.exportExcel} className="p-button-success p-mr-2" data-pr-tooltip="XLS" />
                        <Button type="button" icon="pi pi-file-pdf" onClick={this.exportPdf} className="p-button-warning p-mr-2" data-pr-tooltip="PDF" />
                        <Button type="button" icon="pi pi-filter" onClick={() => this.exportCSV(true)} className="p-button-info p-ml-auto" data-pr-tooltip="Selection Only" />
                    </div>
                    <div className="flex justify-around">
                        <Button type="button" label="Clear" className="p-button-outlined" icon="pi pi-filter-slash" onClick={this.reset} />
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText type="search" value={this.state.globalFilter} onChange={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Global Search" />
                        </span>
                    </div>
                </div>
               
            </div>
        );


        const footer = (
            <div>
                <p>Total Cost : {this.state.sum} Rwf</p>
                <h3>Partern's Percentage</h3>
                {
                    this.state.paterner.map((val,index)=>{
                        return <div key={index}>
                            <div className="flex gap-2"><p>{val.name}</p><p>{val.value}%</p><p>{this.state.sum*(Number(val.value)/100)} Rwf</p></div>
                        </div>
                    })
                }

            </div>
        )

        return (
            <div>
                <div className="card">
                    <Tooltip target=".export-buttons>button" position="bottom" />
                    <div className="datatable-responsive-demo">
                        <div className="card">
                            <DataTable ref={(el) => { this.dt = el; }} value={this.state.tickets} filters style={{ fontSize: "12px" }} className="p-datatable-sm p-datatable-responsive-demo" header={header} footer={footer} resizableColumns columnResizeMode="expand" showGridlines globalFilter={this.state.globalFilter} dataKey="id"
                                selectionMode="multiple" selection={this.state.selectedTickets} onSelectionChange={this.onSelectionChange}>
                                {
                                    this.cols.map((col, index) => <Column key={index} field={col.field} header={col.header} />)
                                }
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}