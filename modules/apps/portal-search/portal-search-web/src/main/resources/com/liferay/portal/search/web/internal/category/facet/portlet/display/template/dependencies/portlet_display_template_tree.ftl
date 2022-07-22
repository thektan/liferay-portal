<#-- START: Setup Mock Values -->
<#assign mockCategoryAJSONObject = jsonFactoryUtil.createJSONObject() />
<@liferay.silently mockCategoryAJSONObject.put("name", "Category A") />
<@liferay.silently mockCategoryAJSONObject.put("frequency", "Category 2") />
<@liferay.silently mockCategoryAJSONObject.put("termId", "1-11") />

<#assign mockCategoryBJSONObject = jsonFactoryUtil.createJSONObject() />
<@liferay.silently mockCategoryBJSONObject.put("name", "Category B") />
<@liferay.silently mockCategoryBJSONObject.put("frequency", "1") />
<@liferay.silently mockCategoryBJSONObject.put("termId", "1-12") />

<#assign mockCategoryCJSONObject = jsonFactoryUtil.createJSONObject() />
<@liferay.silently mockCategoryCJSONObject.put("name", "Category C") />
<@liferay.silently mockCategoryCJSONObject.put("frequency", "3") />
<@liferay.silently mockCategoryCJSONObject.put("termId", "1-13") />

<#assign mockCategoriesJSONArray = jsonFactoryUtil.createJSONArray() />
<#assign mockNestedCategoriesJSONArray = jsonFactoryUtil.createJSONArray() />

<@liferay.silently mockCategoriesJSONArray.put(mockCategoryAJSONObject) />
<@liferay.silently mockCategoriesJSONArray.put(mockCategoryBJSONObject) />

<@liferay.silently mockNestedCategoriesJSONArray.put(mockCategoryCJSONObject) />

<#-- Add Nested Category -->
<@liferay.silently mockCategoryBJSONObject.put("categories", mockNestedCategoriesJSONArray) />

<#-- Mock Vocabulary -->
<#assign mockVocabularyJSONObject = jsonFactoryUtil.createJSONObject() />

<@liferay.silently mockVocabularyJSONObject.put("name", "Vocabulary 1") />
<@liferay.silently mockVocabularyJSONObject.put("id", "1") />
<@liferay.silently mockVocabularyJSONObject.put("categories", mockCategoriesJSONArray) />

<#-- Mock Vocabulary Array -->
<#assign mockVocabularyJSONArray = jsonFactoryUtil.createJSONArray() />

<@liferay.silently mockVocabularyJSONArray.put(mockVocabularyJSONObject) />
<#-- END: Setup Mock Values -->

<#macro treeview_item
	name = ""
	id = ""
	nestedItems = jsonFactoryUtil.createJSONArray()
	nestedItemsProperty = "categories"
>
	<li class="treeview-item" role="none">
		<div
			aria-controls="${namespace}treeItem${id}"
			aria-expanded="true"
			class="treeview-link"
			data-target="#${namespace}treeItem${id}"
			data-toggle="collapse"
			role="treeitem"
			tabindex="0"
		>
			<span class="c-inner" tabindex="-2">
				<span class="autofit-row">
					<#if nestedItems.iterator()?has_content>
						<span class="autofit-col">
							<button
								aria-controls="${namespace}treeItem${id}"
								aria-expanded="true"
								class="btn btn-monospaced component-expander"
								data-target="#${namespace}treeItem${id}"
								data-toggle="collapse"
								onClick="${namespace}toggleTreeItem('${namespace}treeItem${id}');"
								tabindex="-1"
								type="button"
							>
								<span class="c-inner" tabindex="-2">
									<@clay["icon"] symbol="angle-down" />

									<@clay["icon"] cssClass="component-expanded-d-none" symbol="angle-right" />
								</span>
							</button>
						</span>
                    </#if>

					<span class="autofit-col">
						<div class="custom-control custom-checkbox">
							<label>
								<input class="custom-control-input" type="checkbox" />

								<span class="custom-control-label"></span>
							</label>
						</div>
					</span>

					<span class="autofit-col autofit-col-expand">
						<span class="component-text">
							<span
								class="text-truncate-inline"
								title="${name}"
							>
								<span class="text-truncate">
									${name}
								</span>
							</span>
						</span>
					</span>
				</span>
			</span>
		</div>

		<#if nestedItems.iterator()?has_content>
			<div class="collapse show" id="${namespace}treeItem${id}">
				<ul class="treeview-group" role="group">
					<#list nestedItems.iterator() as nestedItem>
						<@treeview_item
							name=nestedItem.getString("name")
							id=nestedItem.getString("termId")
							nestedItems=nestedItem.getJSONArray(nestedItemsProperty)
							nestedItemsProperty="categories"
						/>
					</#list>
				</ul>
			</div>
		</#if>
	</li>
</#macro>

<@liferay_ui["panel-container"]
	extended=true
	id="${namespace + 'facetAssetCategoriesPanelContainer'}"
	markupView="lexicon"
	persistState=true
>
	<@liferay_ui.panel
		collapsible=true
		cssClass="search-facet search-facet-display-label"
		id="${namespace + 'facetAssetCategoriesPanel'}"
		markupView="lexicon"
		persistState=true
		title="category"
	>
		<#if (mockVocabularyJSONArray.iterator())?has_content>
			<#list mockVocabularyJSONArray.iterator() as vocabulary>
				<strong>${vocabulary.getString("name")}</strong>

				<#assign categoriesJSONArray = vocabulary.getJSONArray("categories")! />

				<#if categoriesJSONArray.iterator()?has_content>
					<ul class="treeview treeview-light treeview-nested" role="tree">
						<#list vocabulary.getJSONArray("categories").iterator() as categoryJSONObject>
							<@treeview_item
								name=categoryJSONObject.getString("name")
								id=categoryJSONObject.getString("termId")
								nestedItems=categoryJSONObject.getJSONArray("categories")
								nestedItemsProperty="categories"
							/>
						</#list>
					</ul>
				</#if>
			</#list>
		</#if>

		<#if !assetCategoriesSearchFacetDisplayContext.isNothingSelected()>
			<@liferay_aui.button
				cssClass="btn-link btn-unstyled facet-clear-btn"
				onClick="Liferay.Search.FacetUtil.clearSelections(event);"
				value="clear"
			/>
		</#if>
	</@>
</@>

<@liferay_aui.script>
	function ${namespace}toggleTreeItem(dataTarget) {
		var dataTargetElements = document.querySelector("[data-target=\"#" + dataTarget + "\"]");

		dataTargetElements.forEach(
			element => {
				if (element.classList.contains('collapsed')) {
					element.classList.remove('collapsed');
					element.dataset.expanded = true;
				}
				else {
					element.classList.add('collapsed');
					element.dataset.expanded = false;
				}
			}
		);

		var subtreeCategoryTreeElement = document.getElementById(dataTarget);

		if (subtreeCategoryTreeElement) {
			if (containerNode.classList.contains('show')) {
				containerNode.classList.remove('show');
			}
			else {
				containerNode.classList.add('show');
			}
		}
	}
</@>