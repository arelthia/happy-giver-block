import "./index.scss"
import icons from "./icons"
import {TextControl, Flex, FlexBlock, FlexItem,  __experimentalHStack as HStack, Button, Icon, CheckboxControl, PanelBody, PanelRow, ColorPicker} from "@wordpress/components"
import {InspectorControls} from "@wordpress/block-editor"

wp.blocks.registerBlockType("happygiverblock/happy-giver", {
	title: "Happy Giver",
	icon: icons.block,
	category: "common",
	description: "Donation Form with customizeable amounts and purpose.", 
	attributes: {
		amounts: {type: "array", default: [""]},
		purposes: {type: "array", default: [""]},
		allowCustom: {type: "boolean"},
		bgColor: {type: "string", default: "#F1F1F1"},
		amountButtonColor: {type: "string", default: "#EEEADD"},
		amountColor: {type: "string", default: "#FFFFFF"},
		purposeButtonColor: {type: "string", default: "#EEEADD"},
		purposeColor: {type: "string", default: "#FFFFFF"}
	},
	example: {
		attributes: {
			amounts: ["50", "500", "1000"],
			purposes: ["Food", "Radio"],
			allowCustom: true,
			bgColor: "#F1F1F1",
			amountButtonColor: "#EEEADD",
			amountColor: "#FFFFFF",
			purposeButtonColor: "#EEEADD",
			purposeColor: "#FFFFFF"
		}
	},
	edit: EditComponent,
	save: function (props) {
		return null
	}
})

function EditComponent (props) {
	function onCheckChange(value){
		props.setAttributes({allowCustom: value})
	}
	function deleteAmount(indexToDelete) {
		const newAmounts = props.attributes.amounts.filter(function(x, index) {
			return index != indexToDelete
		})
		props.setAttributes({amounts: newAmounts})
	}
	function deletePurpose(indexToDelete) {
		const newPurposes = props.attributes.purposes.filter(function(x, index){
			return index != indexToDelete
		})
		props.setAttributes({purposes: newPurposes})
	}

	return (
		<div className="happy-giver-edit-block" style={{backgroundColor: props.attributes.bgColor}}>
			<InspectorControls>
				<PanelBody title="Background Color" initialOpen={true}>
					<PanelRow>
						<ColorPicker color={props.attributes.bgColor} onChangeComplete={ theColor => props.setAttributes({bgColor: theColor.hex})} />
					</PanelRow>
				</PanelBody>
				<PanelBody title="Amount Background Color" initialOpen={false}>
					<PanelRow>
						<ColorPicker color={props.attributes.amountButtonColor} onChangeComplete={ amtBg => props.setAttributes({amountButtonColor: amtBg.hex})} />
					</PanelRow>
				</PanelBody>
				<PanelBody title="Amount Color" initialOpen={false}>
					<PanelRow>
						<ColorPicker color={props.attributes.amountColor} onChangeComplete={ amtColor => props.setAttributes({amountColor: amtColor.hex})} />
					</PanelRow>
				</PanelBody>
				<PanelBody title="Purpose Background Color" initialOpen={false}>
					<PanelRow>
						<ColorPicker color={props.attributes.purposeButtonColor} onChangeComplete={ purpBg => props.setAttributes({purposeButtonColor: purpBg.hex})} />
					</PanelRow>
				</PanelBody>
				<PanelBody title="Purpose Color" initialOpen={false}>
					<PanelRow>
						<ColorPicker color={props.attributes.purposeColor} onChangeComplete={ purpColor => props.setAttributes({purposeColor: purpColor.hex})} />
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<p>Amounts</p>
			<HStack >
			{props.attributes.amounts.map(function (amount, index) {
				return (

					<Flex>
						<FlexItem  className="single-amount" style={{color: props.attributes.amountColor , backgroundColor: props.attributes.amountButtonColor , textAlign: "center"}}>
							<TextControl className="single-amount-text" autoFocus={amount == undefined} value={amount}   onChange={newValue => {
								const newAmounts = props.attributes.amounts.concat([])
								newAmounts[index] = newValue
								props.setAttributes({amounts: newAmounts})
							}} />
						
							<Button onClick={() => deleteAmount(index)}>
								<Icon className="delete-amount" icon="dismiss" />
							</Button>
						</FlexItem>
					</Flex>
				)
			})}
			</HStack>
			<CheckboxControl 
				label="Allow Custom Amount" 
				checked={props.attributes.allowCustom}
				onChange={ onCheckChange } 
			/>
			<Button isPrimary onClick={() => {
				props.setAttributes({amounts:props.attributes.amounts.concat([undefined])})
			}}>
				Add Another Amount
			</Button>
			<p>Purposes</p>
			{props.attributes.purposes.map(function (purpose, index){
				return (
					<Flex>
						<FlexBlock>
							<TextControl autoFocus={purpose == undefined} value={purpose} onChange={newValue => {
								const newPurposes = props.attributes.purposes.concat([])
								newPurposes[index] = newValue
								props.setAttributes({purposes: newPurposes})
							}}/>
						</FlexBlock> 
						<FlexItem>
							<Button onClick={() => deletePurpose(index)}>
								<Icon className="delete-purpose" icon="dismiss" />
							</Button>
						</FlexItem>
					</Flex>
				)
			})}
			
			<Button isPrimary onClick={() => {
				props.setAttributes({purposes:props.attributes.purposes.concat([undefined])})
			}}>
				Add Another Purpose
			</Button>
		</div>
	)
}

