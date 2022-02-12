import "./index.scss"
import {TextControl, Flex, FlexBlock, FlexItem,  __experimentalHStack as HStack, Button, Icon, CheckboxControl} from "@wordpress/components"


wp.blocks.registerBlockType("happygiverblock/happy-giver", {
	title: "Happy Giver",
	icon: "smiley",
	category: "common",
	attributes: {
		amounts: {type: "array", default: ["15", "25", "50"]},
		purposes: {type: "array", default: [undefined]},
		allowCustom: {type: "boolean"}
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
		<div className="happy-giver-edit-block">
			<p>Amounts</p>
			<HStack >
			{props.attributes.amounts.map(function (amount, index) {
				return (

					<Flex>
						<FlexItem  className="single-amount" style={{textAlign: "center"}}>
							<TextControl className="single-amount-text" autoFocus={amount == undefined} value={amount}   onChange={newValue => {
								const newAmounts = props.attributes.amounts.concat([undefined])
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
								const newPurposes = props.attributes.purposes.concat(["undefined"])
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